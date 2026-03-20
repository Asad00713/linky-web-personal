"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { gradientTextStyle } from "@/lib/styles";
import { Shield, Mail } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "information-we-collect", number: "01", title: "Information We Collect" },
  { id: "how-we-use", number: "02", title: "How We Use Your Information" },
  { id: "how-we-share", number: "03", title: "How We Share Your Information" },
  { id: "data-retention", number: "04", title: "Data Retention" },
  { id: "your-rights", number: "05", title: "Your Rights Under POPIA" },
  { id: "cookies", number: "06", title: "Cookies and Tracking" },
  { id: "childrens-privacy", number: "07", title: "Children's Privacy" },
  { id: "international-transfers", number: "08", title: "International Data Transfers" },
  { id: "changes", number: "09", title: "Changes to This Policy" },
  { id: "contact", number: "10", title: "Contact Us" },
];

function WordStagger({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

function SectionCard({
  id,
  number,
  title,
  children,
  index,
}: {
  id: string;
  number: string;
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-semibold text-[#1F2323] md:text-2xl">
        <span style={gradientTextStyle} className="mr-3 text-lg font-bold">
          {number}
        </span>
        {title}
      </h2>
      <div className="space-y-4 text-[15px] text-[#454545] [line-height:1.75] md:text-base">
        {children}
      </div>
    </motion.section>
  );
}

export default function PrivacyPolicyPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="scroll-smooth bg-white">
      {/* Hero */}
      <section
        ref={heroRef}
        className="px-[5%] pb-12 pt-20 md:pb-16 md:pt-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(156,236,251,0.15), rgba(101,199,247,0.15), rgba(0,82,212,0.15))",
            }}
          >
            <Shield
              className="h-12 w-12"
              style={{ color: "#0052D4" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#1F2323] md:text-5xl">
            <WordStagger text="Privacy Policy" />
          </h1>
          <p className="mb-3 text-sm font-medium text-[#454545]">
            Last updated: March 2026
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#454545] md:text-lg">
            At LINKey Digital, protecting your personal information is
            fundamental to everything we do. This policy explains in plain
            language what data we collect, how we use it, and the rights you
            have under South African law. No confusing legalese, just honest
            transparency.
          </p>
        </motion.div>
      </section>

      {/* Table of Contents + Content */}
      <div className="mx-auto max-w-[800px] px-[5%] pb-20">
        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 rounded-2xl border border-gray-100 bg-[#FAFAFA] p-6 md:p-8"
        >
          <h2 className="mb-5 text-lg font-semibold text-[#1F2323]">
            Table of Contents
          </h2>
          <ol className="grid gap-2 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#454545] transition-all duration-200 hover:text-[#0052D4] hover:translate-x-1"
                >
                  <span
                    className="text-xs font-semibold opacity-40 transition-opacity group-hover:opacity-100"
                    style={{ color: "#0052D4" }}
                  >
                    {s.number}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Sections */}
        <div className="space-y-6">
          <SectionCard id="information-we-collect" number="01" title="Information We Collect" index={0}>
            <p>
              We collect information to provide, maintain, and improve the LINKey platform. The types of information we gather fall into three categories: information you provide directly, information collected automatically, and information from third-party sources.
            </p>
            <p>
              <strong>Information you provide directly:</strong> When you create a LINKey account, we collect your full name, email address, phone number, job title, company name, and profile photograph. If you build a digital business card, we store the contact details, social media links, website URLs, and any other content you choose to include on your card. We also collect information when you communicate with our support team or respond to surveys.
            </p>
            <p>
              <strong>Information collected automatically:</strong> When you interact with our platform, we automatically collect certain technical data. This includes your device type, operating system, browser version, IP address, general geographic location, pages you visit, features you use, and timestamps of your interactions. We also gather analytics data about your card performance, including views, taps, shares, and contact saves.
            </p>
            <p>
              <strong>Information from third parties:</strong> If you choose to sign in through Google, Microsoft, Apple, or another single sign-on provider, we receive your basic profile information from that service. We may also receive transaction confirmations and payment status updates from our payment processors. We do not receive or store your full payment card details.
            </p>
          </SectionCard>

          <SectionCard id="how-we-use" number="02" title="How We Use Your Information" index={1}>
            <p>
              We process your personal information only when we have a lawful basis to do so, as required by the Protection of Personal Information Act (POPIA). Every piece of data we collect serves a specific purpose tied to delivering and improving our services.
            </p>
            <p>
              <strong>Service delivery:</strong> We use your information to create and manage your LINKey account, generate your digital business cards, enable NFC-based sharing, process payments, and manage your subscription. Your contact details allow us to send important service-related notifications, such as account confirmations, security alerts, and billing receipts.
            </p>
            <p>
              <strong>Improvement and analytics:</strong> We analyse aggregated usage patterns to understand how our platform is used, identify technical issues, and prioritise new features. Card analytics data helps us provide you with insights about your networking reach and card performance. None of this analysis involves identifying individual users without their consent.
            </p>
            <p>
              <strong>Communication:</strong> With your consent, we may send you marketing communications about new features, product updates, and special offers. You can opt out of marketing emails at any time by clicking the unsubscribe link in any email or updating your notification preferences in your account settings.
            </p>
            <p>
              <strong>Security and compliance:</strong> We use information to detect and prevent fraud, abuse, and security incidents. We also process data as necessary to comply with our legal obligations under South African law, respond to lawful requests from authorities, and enforce our Terms of Service.
            </p>
          </SectionCard>

          <SectionCard id="how-we-share" number="03" title="How We Share Your Information" index={2}>
            <p>
              We do not sell, rent, or trade your personal information to third parties for their own marketing purposes. We share your data only in the following limited and necessary circumstances.
            </p>
            <p>
              <strong>Service providers:</strong> We work with trusted partners who help us operate the LINKey platform. These include cloud hosting providers, payment processors (such as Stripe), email delivery services, and analytics tools. Each provider accesses only the specific data they need to perform their function, and all are bound by strict data processing agreements that require them to protect your information and use it solely for the purposes we specify.
            </p>
            <p>
              <strong>When you share your card:</strong> The contact information, social links, and other details you include on your digital business card are shared with the people you choose to share it with. You have full control over what information appears on your card and can update or remove it at any time.
            </p>
            <p>
              <strong>Business transfers:</strong> In the event that LINKey is involved in a merger, acquisition, reorganisation, or sale of assets, your personal information may be transferred as part of that transaction. We will provide advance notice of any such transfer and ensure that the receiving party is bound by privacy obligations at least as protective as those in this policy.
            </p>
            <p>
              <strong>Legal requirements:</strong> We may disclose your information if required to do so by law, regulation, court order, or governmental request. We may also disclose information where we reasonably believe it is necessary to protect the rights, safety, or property of LINKey, our users, or the public, or to detect, prevent, or address fraud or security concerns.
            </p>
          </SectionCard>

          <SectionCard id="data-retention" number="04" title="Data Retention" index={3}>
            <p>
              We retain your personal information only for as long as is necessary to fulfil the purposes for which it was collected, to provide our services, and to comply with our legal obligations. We do not keep data longer than we need it.
            </p>
            <p>
              <strong>Active accounts:</strong> As long as your LINKey account remains active, we retain your profile information, card data, and usage history to provide our services. Subscription and billing records are kept for the duration of your subscription and for a reasonable period thereafter for accounting purposes.
            </p>
            <p>
              <strong>Account closure:</strong> If you choose to close your account, we will delete or anonymise your personal data within 90 days of your request. Certain information may be retained beyond this period where required by law, for example, financial transaction records that must be kept for tax and accounting purposes under South African legislation.
            </p>
            <p>
              <strong>Deletion requests:</strong> You can request deletion of your personal data at any time by contacting us at privacy@linkey.digital or through your account settings. We will process your request in accordance with POPIA requirements and confirm deletion within 30 days.
            </p>
            <p>
              <strong>Aggregated data:</strong> Analytics data that has been aggregated and de-identified so that it can no longer be linked to you may be retained indefinitely. This data helps us understand long-term usage trends and improve our services for all users.
            </p>
          </SectionCard>

          <SectionCard id="your-rights" number="05" title="Your Rights Under POPIA" index={4}>
            <p>
              The Protection of Personal Information Act, 2013 (POPIA) grants you significant rights over your personal information. We are committed to honouring each of these rights fully and promptly. You do not need a legal representative to exercise these rights.
            </p>
            <p>
              <strong>Right to access:</strong> You have the right to request confirmation of whether we hold personal information about you, and to request a copy of that information. We will provide this in a clear, accessible format within 30 days of your request.
            </p>
            <p>
              <strong>Right to correction:</strong> If any personal information we hold about you is inaccurate, incomplete, or outdated, you have the right to request that we correct or update it. You can also make many corrections directly through your account settings.
            </p>
            <p>
              <strong>Right to deletion:</strong> You can request that we delete your personal information at any time, subject to any legal retention requirements. Upon receiving a valid deletion request, we will remove your data within 30 days and confirm the deletion to you.
            </p>
            <p>
              <strong>Right to object:</strong> You have the right to object to the processing of your personal information for direct marketing purposes. You can also object to processing where we rely on legitimate interests as our legal basis, and we will cease processing unless we can demonstrate compelling legitimate grounds.
            </p>
            <p>
              <strong>Right to data portability:</strong> You can request a machine-readable copy of the personal data you have provided to us, allowing you to transfer it to another service. We will provide this data in a commonly used, structured format such as CSV or JSON.
            </p>
            <p>
              <strong>Right to lodge a complaint:</strong> If you believe we have not handled your personal information properly, you have the right to lodge a complaint with the Information Regulator of South Africa at{" "}
              <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-[#0052D4] hover:underline">
                inforegulator.org.za
              </a>
              . To exercise any of these rights, please contact our Information Officer at{" "}
              <a href="mailto:privacy@linkey.digital" className="text-[#0052D4] hover:underline">
                privacy@linkey.digital
              </a>
              .
            </p>
          </SectionCard>

          <SectionCard id="cookies" number="06" title="Cookies and Tracking" index={5}>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on the LINKey platform. Cookies are small text files stored on your device that help us remember your preferences, understand how you use our services, and improve platform performance.
            </p>
            <p>
              <strong>Essential cookies:</strong> These cookies are strictly necessary for the platform to function. They handle authentication, maintain your session, remember your security preferences, and enable core features like card sharing. You cannot disable essential cookies without affecting the functionality of our service.
            </p>
            <p>
              <strong>Analytics cookies:</strong> We use analytics cookies to understand how visitors interact with our platform. These cookies collect information such as which pages are visited most often, how users navigate between features, and where errors occur. This data is aggregated and anonymised, meaning it cannot be used to identify you personally.
            </p>
            <p>
              <strong>Preference cookies:</strong> These cookies remember your settings and preferences, such as your language choice, theme preferences, and notification settings, so you do not have to set them each time you visit.
            </p>
            <p>
              <strong>Managing cookies:</strong> You can manage your cookie preferences through your browser settings. Most browsers allow you to block or delete cookies, although doing so may affect the functionality of certain features. We honour "Do Not Track" signals sent by your browser where technically feasible.
            </p>
          </SectionCard>

          <SectionCard id="childrens-privacy" number="07" title="Children's Privacy" index={6}>
            <p>
              LINKey is a professional networking platform designed for adults. Our services are not intended for, directed at, or designed to attract individuals under the age of 18. We do not knowingly collect, store, or process personal information from children.
            </p>
            <p>
              If we become aware that we have inadvertently collected personal information from a person under 18 without appropriate parental or guardian consent, we will take immediate steps to delete that information from our systems. This deletion will be completed within 72 hours of discovery.
            </p>
            <p>
              Parents and guardians who believe that their child may have provided personal information to LINKey are encouraged to contact us immediately at{" "}
              <a href="mailto:privacy@linkey.digital" className="text-[#0052D4] hover:underline">
                privacy@linkey.digital
              </a>
              . We will work with you to investigate the matter and ensure any such data is promptly removed.
            </p>
          </SectionCard>

          <SectionCard id="international-transfers" number="08" title="International Data Transfers" index={7}>
            <p>
              LINKey Digital is headquartered in South Africa, and your data is primarily stored on secure servers within the country. However, some of our service providers and infrastructure partners operate internationally, which means your data may occasionally be processed in other jurisdictions.
            </p>
            <p>
              When we transfer personal information outside of South Africa, we ensure that appropriate safeguards are in place to protect your data in accordance with POPIA requirements. These safeguards include verifying that the receiving country provides an adequate level of data protection, entering into binding contractual agreements that impose equivalent privacy obligations on the recipient, and obtaining your explicit consent where required by law.
            </p>
            <p>
              We regularly review and assess the data protection practices of our international service providers. If a provider cannot meet our standards, we will either find an alternative provider or implement additional technical safeguards, such as encryption, to protect your data during transfer and storage.
            </p>
            <p>
              You have the right to know where your data is processed. If you have questions about our international data transfers, please contact us at{" "}
              <a href="mailto:privacy@linkey.digital" className="text-[#0052D4] hover:underline">
                privacy@linkey.digital
              </a>
              , and we will provide you with detailed information about the countries involved and the safeguards in place.
            </p>
          </SectionCard>

          <SectionCard id="changes" number="09" title="Changes to This Policy" index={8}>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, improvements to our platform, or evolving legal requirements. We are committed to keeping you informed about how we handle your data, and we will not reduce your rights under this policy without your explicit consent.
            </p>
            <p>
              <strong>Notification of changes:</strong> When we make material changes to this policy, we will notify you at least 30 days before the changes take effect. Notification will be provided through a prominent notice on our platform and, where practicable, via email to the address associated with your account.
            </p>
            <p>
              <strong>Your acceptance:</strong> Your continued use of LINKey after updated terms take effect constitutes your acceptance of the revised policy. If you disagree with any changes, you have the right to close your account and request deletion of your personal data before the new terms take effect.
            </p>
            <p>
              We encourage you to review this policy periodically. The "Last updated" date at the top of this page indicates when the most recent revisions were made. Previous versions of this policy are available upon request.
            </p>
          </SectionCard>

          <SectionCard id="contact" number="10" title="Contact Us" index={9}>
            <p>
              We welcome your questions, concerns, and feedback regarding this Privacy Policy and our data practices. Our Information Officer is responsible for ensuring compliance with POPIA and is available to assist you with any privacy-related matters.
            </p>
            <p>
              <strong>Information Officer:</strong> LINKey Data Protection Team
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@linkey.digital" className="text-[#0052D4] hover:underline">
                privacy@linkey.digital
              </a>
              <br />
              <strong>Address:</strong> Cape Town, Western Cape, South Africa
            </p>
            <p>
              We aim to respond to all privacy-related enquiries within 5 business days and will resolve any formal requests within the 30-day period mandated by POPIA. If you are not satisfied with our response, you have the right to lodge a complaint with the Information Regulator of South Africa at{" "}
              <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-[#0052D4] hover:underline">
                inforegulator.org.za
              </a>
              .
            </p>
          </SectionCard>
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex items-start gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-10"
          style={{
            borderLeft: "4px solid transparent",
            borderImage:
              "linear-gradient(to bottom, #9CECFB, #65C7F7, #0052D4) 1",
          }}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0052D4]/10">
            <Mail className="h-6 w-6 text-[#0052D4]" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-[#1F2323]">
              Questions about this policy?
            </h3>
            <p className="mb-4 text-[15px] text-[#454545] [line-height:1.75]">
              Our privacy team is here to help. Reach out and we will get back
              to you within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:privacy@linkey.digital"
                className="inline-flex items-center gap-2 rounded-full bg-[#0052D4] px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                privacy@linkey.digital
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#0052D4] px-6 py-2.5 text-sm font-semibold text-[#0052D4] transition-transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
