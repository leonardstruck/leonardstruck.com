// Generated by ts-to-zod
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  updatedAt: z.string(),
  createdAt: z.string(),
  enableAPIKey: z.boolean().optional().nullable(),
  apiKey: z.string().optional().nullable(),
  apiKeyIndex: z.string().optional().nullable(),
  email: z.string(),
  resetPasswordToken: z.string().optional().nullable(),
  resetPasswordExpiration: z.string().optional().nullable(),
  salt: z.string().optional().nullable(),
  hash: z.string().optional().nullable(),
  loginAttempts: z.number().optional().nullable(),
  lockUntil: z.string().optional().nullable(),
  password: z.string().nullable(),
});

export const pageSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.array(z.record(z.unknown())).optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  _status: z.union([z.literal("draft"), z.literal("published")]).optional(),
});

export const mediaSchema = z.object({
  id: z.number(),
  alt: z.string().optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  url: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  mimeType: z.string().optional().nullable(),
  filesize: z.number().optional().nullable(),
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  sizes: z
    .object({
      large: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
      medium: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
      small: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
    })
    .optional(),
});

export const payloadPreferenceSchema = z.object({
  id: z.number(),
  user: z.object({
    relationTo: z.literal("users"),
    value: z.union([z.number(), userSchema]),
  }),
  key: z.string().optional().nullable(),
  value: z
    .union([
      z.record(z.unknown()),
      z.array(z.unknown()),
      z.string(),
      z.number(),
      z.boolean(),
    ])
    .optional()
    .nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const payloadMigrationSchema = z.object({
  id: z.number(),
  name: z.string().optional().nullable(),
  batch: z.number().optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const navigationSchema = z.object({
  id: z.number(),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string(),
          type: z
            .union([z.literal("internal"), z.literal("external")])
            .optional(),
          internal: z.union([z.number().nullable(), pageSchema]).optional(),
          external: z.string().optional().nullable(),
        }),
        id: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  updatedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
});

export const homepageSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.array(z.record(z.unknown())).optional().nullable(),
  _status: z.union([z.literal("draft"), z.literal("published")]).optional(),
  updatedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
});

export const footerSchema = z.object({
  id: z.number(),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string(),
          type: z
            .union([z.literal("internal"), z.literal("external")])
            .optional(),
          internal: z.union([z.number().nullable(), pageSchema]).optional(),
          external: z.string().optional().nullable(),
        }),
        id: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  updatedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
});

export const iHeroWithImageBlockSchema = z.object({
  image: z.union([z.number(), mediaSchema]),
  title: z.string(),
  id: z.string().optional().nullable(),
  blockName: z.string().optional().nullable(),
  blockType: z.literal("hero-with-image"),
});

export const blockSchema = z.object({
  id: z.number(),
  blocks: z.array(iHeroWithImageBlockSchema).optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
});

export const configSchema = z.object({
  collections: z.object({
    users: userSchema,
    pages: pageSchema,
    media: mediaSchema,
    "payload-preferences": payloadPreferenceSchema,
    "payload-migrations": payloadMigrationSchema,
  }),
  globals: z.object({
    navigation: navigationSchema,
    homepage: homepageSchema,
    footer: footerSchema,
    blocks: blockSchema,
  }),
});
