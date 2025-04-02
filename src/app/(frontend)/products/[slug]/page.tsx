import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Product } from '@/payload-types'
import { draftMode } from 'next/headers'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })
  console.log(products)
  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}
type Args = {
  params: Promise<{
    slug?: string
  }>
}
export default async function Product({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/products/' + slug

  return <p>hello</p>
}
