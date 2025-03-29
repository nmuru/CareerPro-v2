import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profile schema
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  headline: text("headline"),
  location: text("location"),
  industry: text("industry"),
  currentJobTitle: text("current_job_title"),
  currentCompany: text("current_company"),
  summary: text("summary"),
  experience: jsonb("experience").notNull().default({}),
  education: jsonb("education").notNull().default({}),
  skills: jsonb("skills").notNull().default([]),
  certifications: jsonb("certifications").notNull().default([]),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Interests schema
export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  topics: jsonb("topics").notNull().default([]),
  skills: jsonb("skills").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

// Saved items schema
export const savedItems = pgTable("saved_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  itemType: text("item_type").notNull(), // person, job, course, post, skill
  itemId: text("item_id").notNull(),
  itemData: jsonb("item_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Career goals schema
export const careerGoals = pgTable("career_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  desiredRole: text("desired_role"),
  industry: text("industry"),
  location: text("location"),
  salaryRange: text("salary_range"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Zod schemas for insert operations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProfileSchema = createInsertSchema(profiles);
export const insertInterestSchema = createInsertSchema(interests);
export const insertSavedItemSchema = createInsertSchema(savedItems);
export const insertCareerGoalSchema = createInsertSchema(careerGoals);

// Types for TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;

export type SavedItem = typeof savedItems.$inferSelect;
export type InsertSavedItem = z.infer<typeof insertSavedItemSchema>;

export type CareerGoal = typeof careerGoals.$inferSelect;
export type InsertCareerGoal = z.infer<typeof insertCareerGoalSchema>;
