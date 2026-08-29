import SectionHeading from '@/components/SectionHeading';
import Image from 'next/image';
import { gallery } from '@/data/gallery';

const layoutSizes = [
  'col-span-1 md:col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 md:col-span-2 row-span-1',
  'col-span-1 md:col-span-2 row-span-2'
];

export default function Gallery() {
  return (
    <div className="py-24 bg-brand-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Gallery" 
          subtitle="Glimpses of the passion, sweat, and glory."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 mt-12">
          {gallery.map((imagePath, idx) => (
            <div key={idx} className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-shadow ${layoutSizes[idx % layoutSizes.length]}`}>
              <Image 
                src={imagePath} 
                alt={`Gallery image ${idx + 1}`} 
                fill 
                className="object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-brand-accent text-brand-dark px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                   View Full
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
