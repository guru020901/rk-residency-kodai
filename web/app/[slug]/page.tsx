import { client } from '@/lib/sanity';
import RenderSection from '@/components/RenderSection';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// 1. Generate Static Params (for SSG - Optional but good for performance)
export async function generateStaticParams() {
    const query = `*[_type == "page"]{ "slug": slug.current }`;
    const slugs = await client.fetch(query);
    return slugs.map((item: any) => ({ slug: item.slug }));
}

// 2. Fetch Data
async function getPageData(slug: string) {
    if (!slug) return null;

    const query = `
    {
      "page": *[_type == "page" && slug.current == $slug][0] {
        title,
        pageBuilder,
        seoDescription,
        seoKeywords
      },
      "settings": *[_type == "siteSettings"][0]
    }`;
    return await client.fetch(query, { slug });
}

// 3. Dynamic Metadata (SEO)
type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    const data = await getPageData(slug);
    if (!data?.page) return {};

    return {
        title: `${data.page.title} | RK Residency`,
        description: data.page.seoDescription,
        keywords: data.page.seoKeywords,
    };
}

// 4. Page Component
export default async function DynamicPage({ params }: Props) {
    const slug = (await params).slug;
    const data = await getPageData(slug);

    if (!data?.page) {
        return notFound();
    }

    const { page, settings } = data;

    return (
        <main className="min-h-screen pt-20">
            {page.pageBuilder?.map((section: any, index: number) => (
                <RenderSection
                    key={section._key || index}
                    section={section}
                    globalSettings={settings}
                />
            ))}
        </main>
    );
}
