import { authenticated } from '@/access/authenticated'
import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'site-name',
      label: 'Site Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'socials',
      label: 'Socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
