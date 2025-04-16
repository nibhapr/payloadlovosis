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
import { ServicePage } from './collections/services'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { Homepage } from './collections/homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, ServicePage, Products, Categories],
  editor: lexicalEditor(),
  globals: [SiteSettings, Homepage],
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
      collections: ['ServicePage'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Lovosis Technology L.L.C — ${doc.title}`,
      tabbedUI: true,
    }),
    redirectsPlugin({
      collections: ['products'],
      overrides: {
        // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
  ],
})
