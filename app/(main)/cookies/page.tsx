"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { gradientTextStyle } from "@/lib/styles";
import { Cookie, Mail, ArrowUp, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tocSections = [
  { id: "what-are-cookies", title: "1. What Are Cookies" },
  { id: "cookies-we-use", title: "2. Cookies We Use" },
  { id: "manage-cookies", title: "3. How to Manage Cookies" },
  { id: "third-party", title: "4. Third-Party Cookies" },
  { id: "changes", title: "5. Changes to This Policy" },
  { id: "contact", title: "6. Contact Us" },
];

const cookieCategories = [
  { category: "Essential", purpose: "Required for the platform to function. Handles authentication, security, and basic functionality.", examples: "Session token, CSRF protection, load balancer affinity", duration: "Session / 30 days", canDisable: false },
  { category: "Analytics", purpose: "Help us understand how visitors use LINKey so we can improve the experience. Data is aggregated and anonymised.", examples: "Page views, feature usage, navigation paths", duration: "Up to 12 months", canDisable: true },
  { category: "Marketing", purpose: "Used to deliver relevant ads and measure campaign effectiveness. Only active with consent.", examples: "Ad attribution, conversion tracking, retargeting", duration: "Up to 12 months", canDisable: true },
  { category: "Preferences", purpose: "Remember your settings and personalisation choices like language, theme, and display preferences.", examples: "Language selection, theme preference, dashboard layout", duration: "Up to 12 months", canDisable: true },
];

/* ------------------------------------------------------------------ */
/*  Section Card                                                       */
/* ------------------------------------------------------------------ */

function SectionCard({
  id,
  title,
  children,
  index,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
    >
      <h2 className="mb-4 text-xl font-semibold text-(--color-body) md:text-2xl">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-(--color-card-para) md:text-base md:leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function CookiePolicyPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  return (
    <main className="scroll-smooth">
      {/* 1. Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-[5%] pb-12 pt-16 md:pb-16 md:pt-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <h1 className="heading-1 mb-4 text-(--color-body)">
            Cookie{" "}
            <span style={gradientTextStyle}>Policy</span>
          </h1>
          <p className="para mb-2 text-(--color-card-para)">
            Last updated: 15 March 2026
          </p>
          <p className="lead mx-auto max-w-2xl text-(--color-lead)">
            This policy explains how LINKey uses cookies and similar
            technologies to recognise you when you visit our platform. It covers
            what cookies are, why we use them, and how you can control them.
          </p>
        </motion.div>
      </section>

      {/* 2. Table of Contents + Content */}
      <div className="mx-auto max-w-4xl px-[5%] pb-20">
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8"
        >
          <h2 className="mb-4 text-lg font-semibold text-(--color-body)">Table of Contents</h2>
          <ol className="grid gap-2 sm:grid-cols-2">
            {tocSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-primary transition-colors hover:text-primary-hover hover:underline"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* 3. Sections */}
        <div className="space-y-6">
          <SectionCard id="what-are-cookies" title="1. What Are Cookies" index={0}>
            <p>
              Cookies are small text files placed on your device when you visit
              a website. They are widely used to make websites work more
              efficiently, remember your preferences, and provide information to
              site owners.
            </p>
            <p>
              Cookies can be &quot;session&quot; cookies (deleted when you close
              your browser) or &quot;persistent&quot; cookies (remain for a set
              period). They can be first-party (set by the site you visit) or
              third-party (set by external services the site uses).
            </p>
          </SectionCard>

          <SectionCard id="cookies-we-use" title="2. Cookies We Use" index={1}>
            <p>
              We use cookies across four categories. The table below summarises
              each category, its purpose, and duration.
            </p>

            <motion.div
              ref={tableRef}
              initial={{ opacity: 0, y: 16 }}
              animate={tableInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mt-4 overflow-x-auto"
            >
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-(--color-body)">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-(--color-body)">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-(--color-body)">Duration</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-(--color-body)">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieCategories.map((c, i) => (
                    <tr key={c.category} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50/50" : ""}`}>
                      <td className="px-4 py-3"><span className="text-sm font-medium text-(--color-body)">{c.category}</span></td>
                      <td className="px-4 py-3 text-sm text-(--color-card-para)">{c.purpose}</td>
                      <td className="px-4 py-3 text-sm text-(--color-card-para) whitespace-nowrap">{c.duration}</td>
                      <td className="px-4 py-3 text-sm">
                        {c.canDisable ? (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">Optional</span>
                        ) : (
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Required</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <p className="mt-4 text-sm text-(--color-card-para)">
              <strong>Examples of cookies in each category:</strong>
            </p>
            <ul className="ml-5 list-disc space-y-1">
              {cookieCategories.map((c) => (
                <li key={c.category}><strong>{c.category}:</strong> {c.examples}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard id="manage-cookies" title="3. How to Manage Cookies" index={2}>
            <p>You have control over which cookies you allow:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li><strong>Cookie consent banner:</strong> Accept all, reject optional, or customise your preferences when you first visit.</li>
              <li><strong>Browser settings:</strong> Most browsers let you block or delete cookies. Blocking essential cookies may break functionality.</li>
              <li><strong>Account settings:</strong> Logged-in users can manage cookie preferences from their account at any time.</li>
            </ul>
            <p>For browser-specific instructions:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>
          </SectionCard>

          <SectionCard id="third-party" title="4. Third-Party Cookies" index={3}>
            <p>Some cookies are set by third-party services we use:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li><strong>Google Analytics:</strong> Helps us understand visitor behaviour. Google may use data to personalise ads.</li>
              <li><strong>Stripe:</strong> Our payment processor sets cookies for fraud detection and secure transactions.</li>
              <li><strong>Intercom:</strong> Our support tool uses cookies to identify returning visitors and maintain chat history.</li>
            </ul>
            <p>These third parties have their own privacy and cookie policies. We encourage you to review them.</p>
          </SectionCard>

          <SectionCard id="changes" title="5. Changes to This Policy" index={4}>
            <p>
              We may update this policy to reflect changes in our cookie usage or for legal/regulatory reasons. We will update the &quot;last updated&quot; date and provide a prominent notice for significant changes.
            </p>
          </SectionCard>

          <SectionCard id="contact" title="6. Contact Us" index={5}>
            <p>Questions about cookies? Contact us:</p>
            <ul className="ml-5 list-none space-y-1">
              <li><strong>Email:</strong>{" "}<a href="mailto:privacy@linkey.app" className="text-primary hover:underline">privacy@linkey.app</a></li>
              <li><strong>Address:</strong> Cape Town, South Africa</li>
            </ul>
            <p>
              For broader privacy questions, see our{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </SectionCard>
        </div>

        {/* 4. Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-8 text-center md:p-12"
        >
          <Mail className="mx-auto mb-4 h-8 w-8 text-white" />
          <h3 className="mb-2 text-xl font-semibold text-white md:text-2xl">
            Questions about cookies?
          </h3>
          <p className="mb-6 text-sm text-white/80 md:text-base">
            We are happy to explain in more detail. Reach out any time.
          </p>
          <a
            href="mailto:privacy@linkey.app"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
          >
            Contact Privacy Team
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="mt-8 text-center">
          <a href="#" className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-hover">
            <ArrowUp className="h-4 w-4" /> Back to top
          </a>
        </div>
      </div>
    </main>
  );
}
