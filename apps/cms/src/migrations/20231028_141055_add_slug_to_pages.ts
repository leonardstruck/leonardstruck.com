import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "pages" ADD COLUMN "slug" varchar NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "slug_idx" ON "pages" ("slug");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP INDEX IF EXISTS "slug_idx";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "slug";`);

};
