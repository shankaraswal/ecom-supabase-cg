import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryString = postgres(process.env.DATABASE_URL!);

export const connection = drizzle(queryString);
export const db = drizzle(queryString);