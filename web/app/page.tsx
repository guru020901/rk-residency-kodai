import { client } from '@/lib/sanity';
import RenderSection from '@/components/RenderSection';
import StickyBar from '@/components/StickyBar';

export const revalidate = 60; // Revalidate every 60 seconds

async function getData() {
  const query = `
    {
      "page": *[_type == "page" && slug.current == "home"][0] {
        pageBuilder[]
      },
      "settings": *[_type == "siteSettings"][0] {
        phoneNumber,
        whatsappNumber
      }
    }
  `;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return {};
  }
}

export default async function Home() {
  const data = await getData();
  const pageBuilder = data?.page?.pageBuilder || [];
  const settings = data?.settings || {};

  return (
    <main className="min-h-screen">
      {pageBuilder.length > 0 ? (
        pageBuilder.map((section: any, index: number) => (
          <RenderSection
            key={section._key || index}
            section={section}
            globalSettings={settings}
          />
        ))
      ) : (
        <div className="h-screen flex items-center justify-center bg-kp-green text-kp-cream">
          <h1 className="text-2xl font-serif">Site Under Construction (Connect Sanity to visualize)</h1>
        </div>
      )}

      {/* Sticky Conversion Bar */}
      {settings.phoneNumber && settings.whatsappNumber && (
        <StickyBar
          phoneNumber={settings.phoneNumber}
          whatsappNumber={settings.whatsappNumber}
        />
      )}
    </main>
  );
}
