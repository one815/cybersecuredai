import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

export async function apiRequest(
  arg1: string,
  arg2?: { method?: string; data?: unknown } | RequestInit | string
): Promise<any> {
  // Support both shapes:
  //   apiRequest(url, { method, data })
  //   apiRequest(method, url, data)  <- legacy callers
  let url: string;
  const opts: RequestInit = {};

  const maybeMethod = (arg1 || '').toUpperCase();
  if (/^(GET|POST|PUT|DELETE|PATCH)$/.test(maybeMethod) && typeof arg2 === 'string') {
    // legacy: apiRequest('POST', '/api/..', data)
    url = arg2;
    opts.method = maybeMethod;
    // third arg (data) may be passed via a 3rd param - handled by callers via our codemod which uses an options object
    // but defensively if a 3rd runtime arg exists on arguments, use it
    const data = (arguments.length >= 3) ? arguments[2] : undefined;
    if (data !== undefined) {
      opts.body = typeof data === 'string' ? data : JSON.stringify(data);
      opts.headers = { 'Content-Type': 'application/json' };
    }
  } else {
    // new shape: apiRequest(url, options?)
    url = arg1;
    if (!arg2) {
      opts.method = 'GET';
    } else if (typeof (arg2 as any).method === 'string' || Object.prototype.hasOwnProperty.call(arg2 as any, 'data')) {
      const o = arg2 as { method?: string; data?: unknown };
      opts.method = o.method ?? 'GET';
      if (o.data !== undefined) {
        opts.body = typeof o.data === 'string' ? o.data : JSON.stringify(o.data);
        opts.headers = { 'Content-Type': 'application/json' };
      }
    } else {
      Object.assign(opts, arg2 as RequestInit);
    }
  }

  // merge auth headers
  opts.headers = {
    ...(opts.headers || {}),
    ...getAuthHeaders(),
  } as Record<string, string>;

  opts.credentials = (opts.credentials as RequestCredentials) || 'include';

  const res = await fetch(url, opts);
  await throwIfResNotOk(res);
  // return parsed json by default since most callers expect JSON
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    return text;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const headers = getAuthHeaders();
    
    const res = await fetch(queryKey.join("/") as string, {
      headers,
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
