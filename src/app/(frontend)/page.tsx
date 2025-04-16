import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import HeroSection from '@/components/Hero/hero-section'
import CardSection from '@/components/Card/card-section'
import Divsection from '@/components/divsection/div-section'
import ImageContentSection from '@/components/ImageContent/image-section'

export default async function HomePage() {
  const headers = await getHeaders()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const HomePage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
    overrideAccess: false,
  })

  return (
    <div className="">
      <div className="">
        <HeroSection homepage={HomePage} />
        <ImageContentSection />
        <CardSection />
        <Divsection />
      </div>
    </div>
  )
}
