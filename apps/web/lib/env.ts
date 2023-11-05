import { z } from "zod";

const envSchema = z.object({
    PAYLOAD_URL: z.string().url(),
    PAYLOAD_TOKEN: z.string(),
    BASE_URL: z.string().url().default("http://localhost:3000"),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const envServer = envSchema.safeParse(process.env);

if (!envServer.success) {
    // eslint-disable-next-line no-console -- Give the user a chance to see the error
    console.error(envServer.error.issues);
    throw new Error("Invalid environment variables");
}

const env = envServer.data;

export default env;