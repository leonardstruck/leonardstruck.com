import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
    // create user if provided in env
    if (process.env.PAYLOAD_INITIAL_USER_EMAIL && process.env.PAYLOAD_INITIAL_USER_PASSWORD) {
        await payload.create({
            collection: "users",
            data: {
                email: process.env.PAYLOAD_INITIAL_USER_EMAIL,
                password: process.env.PAYLOAD_INITIAL_USER_PASSWORD,
                apiKey: process.env.PAYLOAD_INITIAL_USER_API_KEY || undefined,
                enableAPIKey: process.env.PAYLOAD_INITIAL_USER_API_KEY ? true : false,
            }
        });
    };
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
    await payload.delete({
        collection: "users",
        where: {
            email: {
                equals: process.env.PAYLOAD_INITIAL_USER_EMAIL
            }
        }
    })
};
