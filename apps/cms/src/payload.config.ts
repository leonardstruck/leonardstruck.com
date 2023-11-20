import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'

import editor from './editor'

import Users from './collections/Users'
import Pages from './collections/Pages'
import Navigation from './globals/Navigation'
import Homepage from './globals/Homepage'
import Footer from './globals/Footer'
import Media from './collections/Media'
import Blocks from './globals/Blocks'
import Posts from './collections/Posts'

const revalidatePath = path.resolve(__dirname, 'lib/revalidate')
const mockModulePath = path.resolve(__dirname, 'lib/mock')

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL,
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
  collections: [Users, Pages, Media, Posts],
  globals: [Navigation, Homepage, Footer, Blocks],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    payloadCloud(),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL,
    },
  }),
})
