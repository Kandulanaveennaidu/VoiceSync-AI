
"use client";
import { useState, useEffect } from 'react';

export default function CookiesPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
      <div className="prose prose-lg max-w-none text-muted-foreground">
        <p>Last updated: {lastUpdatedDate || 'Loading...'}</p>

        <p>
          This Cookie Policy explains what cookies are and how Nedzo AI Calls ("we", "us", or "our") uses them on our website and Service. You should read this policy so you can understand what type of cookies we use, the information we collect using cookies and how that information is used.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">What are cookies?</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">How do we use cookies?</h2>
        <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
        <p>We use cookies to:</p>
        <ul>
          <li>Understand and save user's preferences for future visits.</li>
          <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</li>
          <li>Ensure the security of our Service.</li>
          <li>Provide functionality such as remembering your login details.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for the Service to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.
          </li>
          <li>
            <strong>Performance and Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources, so we can measure and improve the performance of our Service. They help us know which pages are the most and least popular and see how visitors move around the site.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.
          </li>
          <li>
            <strong>Targeting or Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Your Choices Regarding Cookies</h2>
        <p>
          You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of our Service.
        </p>
        <p>
          For more information about how to manage and delete cookies, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">allaboutcookies.org</a>.
        </p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">Contact Us</h2>
        <p>
          If you have any questions about this Cookie Policy, please contact us:
        </p>
        <ul>
          <li>By email: contact@nedzo.ai</li>
        </ul>
      </div>
    </div>
  );
}
