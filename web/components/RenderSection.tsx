import HeroBlock from './blocks/HeroBlock';
import PriceBlock from './blocks/PriceBlock';
import FeaturesBlock from './blocks/FeaturesBlock';
import TestimonialBlock from './blocks/TestimonialBlock';
import ContentBlock from './blocks/ContentBlock';
import GalleryBlock from './blocks/GalleryBlock';
import RoomListBlock from './blocks/RoomListBlock';
import ContactBlock from './blocks/ContactBlock';

import AnimatedSection from './AnimatedSection';

// Map of Sanity types to React Components
const components: any = {
    heroBlock: HeroBlock,
    priceBlock: PriceBlock,
    featuresBlock: FeaturesBlock,
    testimonialBlock: TestimonialBlock,
    contentBlock: ContentBlock,
    galleryBlock: GalleryBlock,
    roomListBlock: RoomListBlock,
    contactBlock: ContactBlock,
    // Add mediaBlock later
};

export default function RenderSection({ section, globalSettings }: { section: any, globalSettings?: any }) {
    const Component = components[section._type];

    if (!Component) {
        // Fallback for unknown types (or incomplete implementations)
        console.warn('Unknown section type:', section._type);
        return null;
    }

    // Don't animate the Hero block via scroll, it should just be there (or animate differently)
    // But for simplicity, we can animate everything. 
    // Actually, Hero usually looks better if it acts as a base.
    // Let's check type.
    const isHero = section._type === 'heroBlock';

    if (isHero) {
        return <Component {...section} globalSettings={globalSettings} />;
    }

    return (
        <AnimatedSection>
            <Component {...section} globalSettings={globalSettings} />
        </AnimatedSection>
    );
}
