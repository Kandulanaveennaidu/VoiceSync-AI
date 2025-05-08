
import Image from 'next/image';

interface Partner {
  name: string;
  logoSrc: string;
  aiHint: string;
}

const partners: Partner[] = [
  { name: 'Agency Alpha', logoSrc: 'https://picsum.photos/150/60?random=1', aiHint: 'modern agency' },
  { name: 'Beta Solutions', logoSrc: 'https://picsum.photos/160/50?random=2', aiHint: 'tech company' },
  { name: 'Gamma Growth', logoSrc: 'https://picsum.photos/140/65?random=3', aiHint: 'marketing firm' },
  { name: 'Delta Digital', logoSrc: 'https://picsum.photos/155/55?random=4', aiHint: 'digital agency' },
  // { name: 'Epsilon Experts', logoSrc: 'https://picsum.photos/145/60?random=5', aiHint: 'consulting group' }, // Removed this partner
];

export default function TrustedBySection() {
  return (
    <section className="py-16 bg-background animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
          Trusted by leading agencies and businesses
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16">
          {partners.map((partner) => (
            <div key={partner.name} className="opacity-70 hover:opacity-100 transition-opacity duration-300" title={partner.name}>
              <Image
                src={partner.logoSrc}
                alt={`${partner.name} logo`}
                width={150} 
                height={60}
                className="object-contain h-10 md:h-12" // Adjusted height for consistency
                data-ai-hint={partner.aiHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

