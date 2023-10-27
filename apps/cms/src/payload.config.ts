import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'

import editor from './editor'

import Users from './collections/Users'
import Pages from './collections/Pages'
import Navigation from './globals/Navigation'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor,
  collections: [Users, Pages],
  globals: [Navigation],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
    declare: false
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL,
    },
  }),
})
