import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "blocks_blocks_two_col_layout" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"left_col" jsonb,
	"right_col" jsonb,
	"block_name" varchar
);

CREATE INDEX IF NOT EXISTS "order_idx" ON "blocks_blocks_two_col_layout" ("_order");
CREATE INDEX IF NOT EXISTS "parent_id_idx" ON "blocks_blocks_two_col_layout" ("_parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "blocks_blocks_two_col_layout" ("_path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "media" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "blocks_blocks_two_col_layout" ADD CONSTRAINT "blocks_blocks_two_col_layout__parent_id_blocks_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "blocks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "blocks_blocks_two_col_layout";
DROP INDEX IF EXISTS "created_at_idx";`);

};
