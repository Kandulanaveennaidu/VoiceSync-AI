
import Image from 'next/image';

export default function TrustedBySection() {
  return (
    <section className="py-16 bg-background animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
          Trusted by leading agencies and businesses
        </h2>
        <div className="flex justify-center items-center">
          <div> {/* Wrapper for the single logo */}
            <Image
              src="https://picsum.photos/180/60" // Placeholder for the company logo
              alt="Nedzo AI Company Logo" // Specific alt text for their company
              width={180}
              height={60}
              className="object-contain" // Ensures the logo fits well
              data-ai-hint="NedzoAI logo" // Hint for AI to find the company's logo
            />
          </div>
        </div>
      </div>
    </section>
  );
}

