
"use client";
import { useState, useEffect } from 'react';

export default function TermsPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
      <div className="prose prose-lg max-w-none text-muted-foreground">
        <p>Last updated: {lastUpdatedDate || 'Loading...'}</p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Nedzo AI Calls service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">2. Description of Service</h2>
        <p>
          Nedzo AI Calls provides an AI-powered voice assistant SaaS platform designed for marketing agencies and businesses to manage leads and calls. Features include lead qualification, AI calendar booking, CRM integration, and more as described on our website.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">3. User Accounts</h2>
        <p>
          To use certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">4. Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
        </p>
        <ul>
          <li>In any way that violates any applicable national or international law or regulation.</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
          <li>To impersonate or attempt to impersonate Nedzo AI Calls, a Nedzo AI Calls employee, another user, or any other person or entity.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">5. Fees and Payment</h2>
        <p>
          Certain aspects of the Service may be provided for a fee. You agree to pay all applicable fees as described on our website in connection with such Service selected by you. We reserve the right to change our prices and to institute new charges at any time.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">6. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of Nedzo AI Calls and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">7. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">8. Limitation of Liability</h2>
        <p>
          In no event shall Nedzo AI Calls, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">9. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">10. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">11. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at contact@nedzo.ai.
        </p>
      </div>
    </div>
  );
}
