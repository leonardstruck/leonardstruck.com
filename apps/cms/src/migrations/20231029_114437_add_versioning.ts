import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_homepage_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__homepage_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_slug" varchar,
	"version_content" jsonb,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer
);

CREATE TABLE IF NOT EXISTS "_homepage_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_title" varchar,
	"version_content" jsonb,
	"version__status" "enum__homepage_v_version_status",
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
ALTER TABLE "homepage" ALTER COLUMN "title" DROP NOT NULL;
ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status";
ALTER TABLE "homepage" ADD COLUMN "_status" "enum_homepage_status";
CREATE INDEX IF NOT EXISTS "version_slug_idx" ON "_pages_v" ("version_slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "_pages_v" ("created_at");
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "_pages_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "latest_idx" ON "_pages_v" ("latest");
CREATE INDEX IF NOT EXISTS "order_idx" ON "_pages_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "_pages_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "_pages_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "latest_idx" ON "_homepage_v" ("latest");
DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_id__pages_v_id_fk" FOREIGN KEY ("parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "_pages_v";
DROP TABLE "_pages_v_rels";
DROP TABLE "_homepage_v";
ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "homepage" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "pages" DROP COLUMN IF EXISTS "_status";
ALTER TABLE "homepage" DROP COLUMN IF EXISTS "_status";`);

};
