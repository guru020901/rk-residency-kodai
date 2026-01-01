import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ifv1u8jf'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false if statically generating everything, but true for better performance
})

export const urlFor = (source: any) => createImageUrlBuilder(client).image(source).auto('format').fit('max').quality(80)
