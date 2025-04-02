// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { SiteSettings } from './globals/Settings/config'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Homepage } from './collections/homepage'
import { ServicePage } from './collections/services'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Homepage, ServicePage, Products, Categories],
  editor: lexicalEditor(),
  globals: [SiteSettings],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // database-adapter-config-end

  plugins: [
    seoPlugin({
      collections: ['homepage'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Lovosis Technology L.L.C — ${doc.title}`,
      tabbedUI: true,
    }),
  ],
})
