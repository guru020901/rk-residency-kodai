import siteSettings from './siteSettings'
import room from './room'
import page from './page'
import heroBlock from './heroBlock'
import galleryBlock from './galleryBlock'
import mediaBlock from './mediaBlock'
import priceBlock from './priceBlock'
import featuresBlock from './featuresBlock'
import testimonialBlock from './testimonialBlock'
import contentBlock from './contentBlock'
import villaBlock from './villaBlock'
import aboutBlock from './aboutBlock'

import roomListBlock from './roomListBlock'
import contactBlock from './contactBlock'

export const schemaTypes = [
    // Singletons
    siteSettings,

    // Documents
    page,
    room,

    // Blocks
    heroBlock,
    galleryBlock,
    featuresBlock,
    priceBlock,
    roomListBlock,
    mediaBlock,
    contactBlock,
    testimonialBlock,
    contentBlock,
    villaBlock,
    aboutBlock,
]
