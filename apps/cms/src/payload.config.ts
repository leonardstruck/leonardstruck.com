import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { buildConfig } from 'payload/config'

import editor from './editor'

import Users from './collections/Users'
import Pages from './collections/Pages'
import Navigation from './globals/Navigation'
import Homepage from './globals/Homepage'
import Footer from './globals/Footer'
import Media from './collections/Media'

const revalidatePath = path.resolve(__dirname, 'lib/revalidate')
const mockModulePath = path.resolve(__dirname, 'lib/mock')

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [revalidatePath]: mockModulePath,
        }
      }
    }),
  },
  editor,
  collections: [Users, Pages, Media],
  globals: [Navigation, Homepage, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    payloadCloud(),
    cloudStorage({
      collections: {
        "media": {
          adapter: s3Adapter({
            config: {
              credentials: {
                accessKeyId: process.env.PAYLOAD_S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.PAYLOAD_S3_SECRET_ACCESS_KEY,
              },
              endpoint: process.env.PAYLOAD_S3_ENDPOINT,
              region: process.env.PAYLOAD_S3_REGION,
              forcePathStyle: process.env.PAYLOAD_S3_FORCE_PATH_STYLE === "true",
            },
            bucket: process.env.PAYLOAD_S3_BUCKET
          })
        }
      }
    })
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL,
    },
  }),
})
