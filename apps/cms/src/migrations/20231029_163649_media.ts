import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"sizes_large_url" varchar,
	"sizes_large_width" numeric,
	"sizes_large_height" numeric,
	"sizes_large_mime_type" varchar,
	"sizes_large_filesize" numeric,
	"sizes_large_filename" varchar,
	"sizes_medium_url" varchar,
	"sizes_medium_width" numeric,
	"sizes_medium_height" numeric,
	"sizes_medium_mime_type" varchar,
	"sizes_medium_filesize" numeric,
	"sizes_medium_filename" varchar,
	"sizes_small_url" varchar,
	"sizes_small_width" numeric,
	"sizes_small_height" numeric,
	"sizes_small_mime_type" varchar,
	"sizes_small_filesize" numeric,
	"sizes_small_filename" varchar
);

CREATE INDEX IF NOT EXISTS "sizes_small_filename_idx" ON "media" ("sizes_small_filename");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "media";`);

};
