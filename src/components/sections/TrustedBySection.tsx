import Image from 'next/image';

const partners = [
  { name: 'Zapier', logoSrc: 'https://picsum.photos/120/40', hint: 'zapier logo' },
  { name: 'Google', logoSrc: 'https://picsum.photos/120/40', hint: 'google logo' },
  { name: 'Stripe', logoSrc: 'https://picsum.photos/120/40', hint: 'stripe logo' },
  { name: 'HighLevel', logoSrc: 'https://picsum.photos/120/40', hint: 'highlevel logo' },
  { name: 'Calendly', logoSrc: 'https://picsum.photos/120/40', hint: 'calendly logo' },
];

export default function TrustedBySection() {
  return (
    <section className="py-16 bg-background animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
          Trusted by leading agencies and businesses
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16">
          {partners.map((partner) => (
            <div key={partner.name} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <Image
                src={partner.logoSrc}
                alt={`${partner.name} logo`}
                width={120}
                height={40}
                className="object-contain filter grayscale"
                data-ai-hint={partner.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
