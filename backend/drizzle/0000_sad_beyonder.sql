CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'New Note' NOT NULL,
	"content" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
