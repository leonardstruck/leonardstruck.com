import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_footer_links_link_type" AS ENUM('internal', 'external');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "footer_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_label" varchar NOT NULL,
	"link_type" "enum_footer_links_link_type",
	"link_external" varchar
);

CREATE TABLE IF NOT EXISTS "footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "footer_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer
);

CREATE INDEX IF NOT EXISTS "_order_idx" ON "footer_links" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "footer_links" ("_parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "footer_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "footer_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "footer_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links__parent_id_footer_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_id_footer_id_fk" FOREIGN KEY ("parent_id") REFERENCES "footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_id_pages_id_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "footer_links";
DROP TABLE "footer";
DROP TABLE "footer_rels";`);

};
