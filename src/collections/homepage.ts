import type { GlobalConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { upload } from 'node_modules/payload/dist/fields/validations'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true, // Allow public access (adjust as needed)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'sliderImage',
      type: 'array',
      label: 'Slider Image',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'upload slider image',
          },
        },
      ],
    },
  ],
}
