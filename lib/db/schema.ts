import { sql } from "drizzle-orm";
import { index, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    provider: varchar("provider", { length: 20 }),
    externalId: varchar("external_id", { length: 100 }).notNull(),
    image: text("image"),
    role: varchar("role", { length: 20 }).notNull().default("customer"),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// products table schema
export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    image: text('image'),
    description: text('description'),
    price: integer('price').notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});



// warehouses table schema
export const warehouses = pgTable('warehouses', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    pincode: varchar('pincode', { length: 6 }).notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
}, (table) => {
    return {
        pincodeIdx: index("pincode-idx").on(table.pincode)
    }
});
