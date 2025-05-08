
"use client";
import { useState, useEffect } from 'react';

export default function PrivacyPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-muted-foreground">
        <p>Last updated: {lastUpdatedDate || 'Loading...'}</p>

        <p>
          Nedzo AI Calls ("us", "we", or "our") operates the Nedzo AI Calls website and service (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">1. Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Usage Data</li>
        </ul>
        <h4>Usage Data</h4>
        <p>
          We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">2. Use of Data</h2>
        <p>Nedzo AI Calls uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">3. Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">4. Service Providers</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">5. Links to Other Sites</h2>
        <p>
          Our Service may contain links to other sites that are not operated by us. If you click a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">6. Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">7. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul>
          <li>By email: contact@nedzo.ai</li>
        </ul>
      </div>
    </div>
  );
}
