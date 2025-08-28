import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

function getStoredToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export function useAuth() {
  const hasToken = getStoredToken() !== null;
  
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: hasToken, // Only run query if we have a token
    retry: false,
  });

  return {
    user: user || null,
    isLoading: hasToken ? isLoading : false, // Don't show loading if no token
    isAuthenticated: !!user && !error,
  };
}
