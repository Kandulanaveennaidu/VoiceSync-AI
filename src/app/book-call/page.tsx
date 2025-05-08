
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function BookCallPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder for Calendly URL, replace with your actual Calendly link
  const calendlyUrl = "https://calendly.com/your-username"; 
  // You can customize the URL based on the plan if needed
  // e.g., `https://calendly.com/your-username/${plan}-demo`

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsLoading(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 min-h-screen">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Book a Call with Our Team
        </h1>
        {plan && (
          <p className="text-xl text-muted-foreground mb-2">
            You're interested in the <span className="font-semibold text-primary capitalize">{plan}</span> plan.
          </p>
        )}
        <p className="text-muted-foreground mb-10">
          Schedule a convenient time to discuss your needs and see how Nedzo AI can transform your agency.
        </p>

        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Loading Calendar...</p>
          </div>
        )}

        <div
          className="calendly-inline-widget"
          data-url={calendlyUrl}
          style={{ minWidth: '320px', height: '700px', display: isLoading ? 'none' : 'block' }}
        />
        
        {!isLoading && (
            <noscript>
                <p className="text-red-500">JavaScript is required to load the booking calendar. Please enable JavaScript in your browser.</p>
                <p className="mt-4">Alternatively, you can book a call directly on <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">our Calendly page</a>.</p>
            </noscript>
        )}

      </div>
    </div>
  );
}
