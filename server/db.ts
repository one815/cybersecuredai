import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Type definitions for dependency injection patterns
export type Db = ReturnType<typeof drizzle>;
export type DbProvider = () => Db | null;

let _pool: Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

// Lazy database connection initialization
function getPool(): Pool {
  if (!_pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?",
      );
    }
    _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return _pool;
}

function getDb() {
  if (!_db) {
    _db = drizzle({ client: getPool(), schema });
  }
  return _db;
}

// Check if database is available without throwing
export function isDatabaseAvailable(): boolean {
  return !!process.env.DATABASE_URL;
}

// Get database instance if available, null otherwise - for dependency injection patterns
export function getDbIfAvailable(): Db | null {
  if (!isDatabaseAvailable()) {
    return null;
  }
  try {
    return getDb();
  } catch (error) {
    console.warn('Database connection failed:', error);
    return null;
  }
}

// Helper function to call fn with db if available, else returns fallback/no-op
export function withDb<T>(
  fn: (db: Db) => T | Promise<T>,
  fallback?: () => T | Promise<T>
): T | Promise<T> | undefined {
  const dbInstance = getDbIfAvailable();
  if (dbInstance) {
    return fn(dbInstance);
  }
  return fallback ? fallback() : undefined;
}

// Exported lazy database instances
export const pool = new Proxy({} as Pool, {
  get(target, prop) {
    return getPool()[prop as keyof Pool];
  }
});

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});
