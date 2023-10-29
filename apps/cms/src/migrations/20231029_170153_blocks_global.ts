import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "blocks_blocks_hero_with_image" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "blocks_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE INDEX IF NOT EXISTS "order_idx" ON "blocks_blocks_hero_with_image" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "blocks_blocks_hero_with_image" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "blocks_blocks_hero_with_image" ("_path");
CREATE INDEX IF NOT EXISTS "order_idx" ON "blocks_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "blocks_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "blocks_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "blocks_blocks_hero_with_image" ADD CONSTRAINT "blocks_blocks_hero_with_image__parent_id_blocks_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blocks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blocks_rels" ADD CONSTRAINT "blocks_rels_parent_id_blocks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "blocks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blocks_rels" ADD CONSTRAINT "blocks_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "blocks_blocks_hero_with_image";
DROP TABLE "blocks";
DROP TABLE "blocks_rels";`);

};
