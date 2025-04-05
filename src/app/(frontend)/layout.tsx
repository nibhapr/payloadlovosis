import React from 'react'
import './styles.css'
import { Header } from '@/Header/Component'
import configPromise from '@payload-config'
import { Media } from '@/payload-types'
import { getPayload } from 'payload'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}
const payload = await getPayload({ config: configPromise })
const favicon = (await payload.findGlobal({ slug: 'site-settings' })).favicon as Media
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>{favicon?.url && <link href={favicon.url} rel="icon" sizes="32x32" />}</head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
