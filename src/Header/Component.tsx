import { HeaderClient } from './Component.client'
// import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Media } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Header() {
  // const headerData: Header = await getCachedGlobal('header', 1)()
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const logo = settings.logo as Media
  const favicon = settings.favicon as Media
  return <HeaderClient logo={logo} favicon={favicon} />
}
