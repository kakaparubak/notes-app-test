import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default(`New Note`),
  content: text("content").default("Hellow!"),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow()
});
