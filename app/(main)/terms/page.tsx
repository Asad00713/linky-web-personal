"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { gradientTextStyle } from "@/lib/styles";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "acceptance", number: "01", title: "Acceptance of Terms" },
  { id: "account-registration", number: "02", title: "Account Registration" },
  { id: "acceptable-use", number: "03", title: "Acceptable Use" },
  { id: "intellectual-property", number: "04", title: "Intellectual Property" },
  { id: "payment-billing", number: "05", title: "Payment & Billing" },
  { id: "free-trial", number: "06", title: "Free Trial" },
  { id: "cancellation-refunds", number: "07", title: "Cancellation & Refunds" },
  { id: "limitation-liability", number: "08", title: "Limitation of Liability" },
  { id: "indemnification", number: "09", title: "Indemnification" },
  { id: "governing-law", number: "10", title: "Governing Law" },
  { id: "changes", number: "11", title: "Changes to Terms" },
  { id: "contact", number: "12", title: "Contact Us" },
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

export default function TermsOfServicePage() {
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
            <FileText
              className="h-12 w-12"
              style={{ color: "#0052D4" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#1F2323] md:text-5xl">
            <WordStagger text="Terms of Service" />
          </h1>
          <p className="mb-3 text-sm font-medium text-[#454545]">
            Last updated: March 2026
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#454545] md:text-lg">
            These terms govern your use of the LINKey Digital platform. We have
            written them in plain language because we believe you should
            understand your rights and responsibilities without needing a law
            degree. Please read them carefully before using our services.
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
          <SectionCard id="acceptance" number="01" title="Acceptance of Terms" index={0}>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and LINKey Digital (Pty) Ltd ("LINKey", "we", "us", or "our"), governing your access to and use of the LINKey platform. This includes our website, web application, mobile applications, NFC-enabled products, and all related services (collectively, the "Service").
            </p>
            <p>
              By creating an account, accessing, or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy, which is incorporated by reference. If you are using LINKey on behalf of a company, organisation, or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms.
            </p>
            <p>
              If you do not agree with any provision of these Terms, you must not create an account or use the Service. Your continued use of LINKey after any modifications to these Terms constitutes acceptance of the updated terms. These Terms are governed by and should be interpreted in accordance with the Electronic Communications and Transactions Act, 2002 (ECT Act) of South Africa.
            </p>
          </SectionCard>

          <SectionCard id="account-registration" number="02" title="Account Registration" index={1}>
            <p>
              To access most features of the LINKey platform, you must create an account. During registration, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the accuracy of your account details and must update them promptly if they change.
            </p>
            <p>
              <strong>Account security:</strong> You are solely responsible for maintaining the confidentiality of your login credentials, including your password and any authentication tokens. You agree to notify us immediately at{" "}
              <a href="mailto:legal@linkey.digital" className="text-[#0052D4] hover:underline">legal@linkey.digital</a>{" "}
              if you become aware of any unauthorised access to or use of your account. LINKey will not be liable for any loss or damage arising from your failure to safeguard your credentials.
            </p>
            <p>
              <strong>Age requirement:</strong> You must be at least 18 years of age to create an account and use the Service. By registering, you confirm that you meet this age requirement. Accounts found to be registered by individuals under 18 will be suspended and their associated data deleted in accordance with our Privacy Policy and the Protection of Personal Information Act (POPIA).
            </p>
            <p>
              We reserve the right to suspend or terminate any account at our discretion if we reasonably believe it contains false or misleading information, violates these Terms, or poses a security risk to other users or our platform.
            </p>
          </SectionCard>

          <SectionCard id="acceptable-use" number="03" title="Acceptable Use" index={2}>
            <p>
              LINKey is a professional networking platform, and we expect all users to conduct themselves accordingly. You agree to use the Service in compliance with all applicable laws, regulations, and these Terms. Prohibited activities include, but are not limited to, the following.
            </p>
            <p>
              <strong>Unlawful and harmful conduct:</strong> You may not use the Service for any illegal purpose, to promote violence or discrimination, to distribute harmful or malicious content, or to infringe upon the rights of others. This includes uploading defamatory, obscene, fraudulent, or misleading content to your digital business card or profile.
            </p>
            <p>
              <strong>Impersonation and misrepresentation:</strong> You may not impersonate another individual or entity, falsely claim an affiliation with any person or organisation, or create accounts using fictitious identities for deceptive purposes. All information on your LINKey card must accurately represent you or your authorised business entity.
            </p>
            <p>
              <strong>Technical abuse:</strong> You may not attempt to gain unauthorised access to our systems, other users' accounts, or any data not intended for you. The use of automated scripts, bots, scrapers, or other automated means to access or interact with the Service is strictly prohibited. You may not interfere with, disrupt, or overload our servers, networks, or infrastructure.
            </p>
            <p>
              <strong>Spam and abuse:</strong> Distributing spam, phishing messages, chain letters, or unsolicited commercial messages through the Service is prohibited. You may not use LINKey to harvest contact information for unsolicited communications. Violations of this policy may result in immediate account suspension or termination, with or without prior notice.
            </p>
          </SectionCard>

          <SectionCard id="intellectual-property" number="04" title="Intellectual Property" index={3}>
            <p>
              <strong>LINKey&apos;s intellectual property:</strong> The LINKey platform, including its design, user interface, source code, algorithms, logos, trademarks, documentation, and all associated intellectual property, is owned exclusively by LINKey Digital (Pty) Ltd and is protected by South African and international intellectual property laws. You may not copy, modify, distribute, sell, lease, reverse-engineer, decompile, or create derivative works based on any part of the Service without our express written permission.
            </p>
            <p>
              <strong>Your content:</strong> You retain full ownership of the content you upload to LINKey, including your profile information, photographs, card designs, and any other materials you create or provide ("Your Content"). By uploading content to the platform, you grant LINKey a limited, non-exclusive, worldwide, royalty-free licence to host, display, reproduce, and distribute Your Content solely as necessary to provide and operate the Service.
            </p>
            <p>
              This licence is limited to the operation of the Service and does not grant LINKey any rights to use Your Content for other purposes. The licence terminates when you delete Your Content or close your account, except where copies are reasonably necessary for backup, legal compliance, or where Your Content has been shared with third parties through the normal operation of the Service (e.g., when you share your card with a contact).
            </p>
            <p>
              <strong>Feedback:</strong> If you provide us with suggestions, ideas, or feedback about the Service, you agree that we may use such feedback without restriction or obligation to you. This does not apply to any personal information included in feedback, which remains subject to our Privacy Policy.
            </p>
          </SectionCard>

          <SectionCard id="payment-billing" number="05" title="Payment & Billing" index={4}>
            <p>
              Certain features of the LINKey platform require a paid subscription. By subscribing to a paid plan, you agree to pay the applicable fees as described on our pricing page. All prices are displayed in South African Rands (ZAR) unless otherwise indicated, and include Value-Added Tax (VAT) where applicable.
            </p>
            <p>
              <strong>Subscription billing:</strong> Subscriptions are billed on a recurring basis, either monthly or annually, depending on the plan you select. Your chosen payment method will be charged automatically at the beginning of each billing cycle. You authorise LINKey to charge these recurring fees until you cancel your subscription.
            </p>
            <p>
              <strong>Payment processing:</strong> All payments are processed securely through our third-party payment processor, Stripe. LINKey does not store your full credit or debit card details on our servers. By providing your payment information, you represent that you are authorised to use the payment method and that the information is accurate.
            </p>
            <p>
              <strong>Failed payments:</strong> If a payment fails due to insufficient funds, expired cards, or other reasons, we will notify you and may attempt to charge the payment method again. If payment cannot be collected after reasonable attempts, we may suspend your access to premium features until the outstanding amount is resolved. Your basic account and free-tier features will remain accessible during this period.
            </p>
            <p>
              <strong>Price changes:</strong> We reserve the right to modify our pricing at any time. If we increase the price of your current plan, we will provide at least 30 days&apos; notice before the new pricing takes effect. You may cancel your subscription before the new price applies if you do not wish to continue at the updated rate.
            </p>
          </SectionCard>

          <SectionCard id="free-trial" number="06" title="Free Trial" index={5}>
            <p>
              LINKey may offer a 14-day free trial of premium features to eligible users. The trial gives you full access to the features included in the selected plan so you can evaluate the Service before committing to a paid subscription.
            </p>
            <p>
              <strong>Trial terms:</strong> No payment information is required to start a free trial unless otherwise stated at the time of sign-up. During the trial period, you have access to all premium features associated with the trial plan. At the end of the 14-day period, your account will automatically revert to the free plan unless you choose to subscribe to a paid plan.
            </p>
            <p>
              <strong>Eligibility:</strong> Free trials are generally available once per user. We may verify eligibility based on your email address, device information, or other reasonable means. Creating multiple accounts to obtain additional free trials is a violation of these Terms and may result in account termination.
            </p>
            <p>
              We reserve the right to modify the duration, features, or availability of free trials at any time without prior notice. Any such changes will not affect trials that are already in progress at the time of the modification.
            </p>
          </SectionCard>

          <SectionCard id="cancellation-refunds" number="07" title="Cancellation & Refunds" index={6}>
            <p>
              <strong>How to cancel:</strong> You can cancel your LINKey subscription at any time through your account settings. Cancellation takes effect at the end of your current billing period. You will continue to have access to premium features until that date, after which your account will revert to the free plan.
            </p>
            <p>
              <strong>After cancellation:</strong> When your subscription ends, your account, profile, and digital business cards will be preserved. However, certain premium features such as advanced analytics, custom branding, and team management tools will become unavailable. You can resubscribe at any time to regain access to premium features.
            </p>
            <p>
              <strong>Refund policy:</strong> Because LINKey is a digital service, we generally do not offer refunds for subscription payments already processed. However, we handle refund requests on a case-by-case basis and may grant refunds in exceptional circumstances, such as billing errors, service outages affecting your use for an extended period, or if you cancel within 48 hours of an accidental renewal.
            </p>
            <p>
              <strong>Account deletion:</strong> If you wish to permanently delete your account and all associated data, you can do so from your account settings or by contacting us at{" "}
              <a href="mailto:legal@linkey.digital" className="text-[#0052D4] hover:underline">legal@linkey.digital</a>
              . Account deletion is irreversible. We will process your deletion request within 30 days in accordance with our Privacy Policy and POPIA requirements.
            </p>
          </SectionCard>

          <SectionCard id="limitation-liability" number="08" title="Limitation of Liability" index={7}>
            <p>
              To the maximum extent permitted by the laws of the Republic of South Africa, including the Consumer Protection Act, 2008 and the ECT Act, LINKey Digital (Pty) Ltd, its directors, officers, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the Service.
            </p>
            <p>
              <strong>Exclusions:</strong> Without limiting the foregoing, LINKey shall not be liable for any loss of profits, revenue, data, business opportunities, goodwill, or anticipated savings, whether arising in contract, tort (including negligence), breach of statutory duty, or otherwise, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              <strong>Liability cap:</strong> In any event, LINKey&apos;s total aggregate liability to you for all claims arising out of or related to these Terms or the Service shall not exceed the total amount you have paid to LINKey in subscription fees during the twelve (12) months immediately preceding the event giving rise to the claim. If you have not made any payments, our maximum liability shall not exceed R500 (five hundred South African Rands).
            </p>
            <p>
              <strong>Service availability:</strong> The Service is provided on an "as is" and "as available" basis. We do not warrant that the Service will be uninterrupted, error-free, or completely secure. We are not responsible for any delays, delivery failures, or other damage resulting from limitations inherent to internet connectivity or electronic communications.
            </p>
          </SectionCard>

          <SectionCard id="indemnification" number="09" title="Indemnification" index={8}>
            <p>
              You agree to indemnify, defend, and hold harmless LINKey Digital (Pty) Ltd, its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any and all claims, demands, actions, damages, losses, costs, liabilities, and expenses (including reasonable legal fees) arising out of or related to:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Your use or misuse of the Service, including any content you create, upload, or share through the platform</li>
              <li>Your violation of these Terms or any applicable law, regulation, or third-party right</li>
              <li>Any dispute between you and another user or third party arising from your use of the Service</li>
              <li>Your negligence or wilful misconduct in connection with your use of the Service</li>
            </ul>
            <p>
              This indemnification obligation will survive the termination of your account and these Terms. We reserve the right, at our own expense, to assume the exclusive defence and control of any matter otherwise subject to indemnification by you, in which event you agree to cooperate with us in asserting any available defences.
            </p>
            <p>
              Nothing in this section is intended to limit your rights under the Consumer Protection Act, 2008, or any other consumer protection legislation that may apply to you under South African law.
            </p>
          </SectionCard>

          <SectionCard id="governing-law" number="10" title="Governing Law" index={9}>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of South Africa, including the Electronic Communications and Transactions Act, 2002 (ECT Act), the Consumer Protection Act, 2008 (CPA), and the Protection of Personal Information Act, 2013 (POPIA), without regard to conflict of law principles.
            </p>
            <p>
              <strong>Jurisdiction:</strong> Any legal proceedings, disputes, or claims arising out of or in connection with these Terms or the Service shall be subject to the exclusive jurisdiction of the courts of the Western Cape Division, Cape Town. By using the Service, you consent to the personal jurisdiction of these courts and waive any objection to the laying of venue in such courts.
            </p>
            <p>
              <strong>Dispute resolution:</strong> Before initiating any formal legal proceedings, both parties agree to attempt to resolve disputes amicably. You should first contact our support team at{" "}
              <a href="mailto:legal@linkey.digital" className="text-[#0052D4] hover:underline">legal@linkey.digital</a>
              , and we will endeavour to resolve the matter within 14 business days. If informal resolution is unsuccessful, either party may request mediation through an accredited mediator in Cape Town before proceeding to litigation.
            </p>
            <p>
              <strong>Severability:</strong> If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid and enforceable, or severed from these Terms if modification is not possible. The remaining provisions shall continue in full force and effect.
            </p>
          </SectionCard>

          <SectionCard id="changes" number="11" title="Changes to Terms" index={10}>
            <p>
              LINKey reserves the right to modify, amend, or replace these Terms at any time. Changes may be necessary due to updates to our Service, changes in applicable law, or improvements to our business practices. We are committed to providing you with reasonable notice of any material changes.
            </p>
            <p>
              <strong>30-day notice:</strong> When we make material changes to these Terms, we will provide you with at least 30 days&apos; advance notice before the updated Terms take effect. Notice will be delivered through a prominent announcement on our platform and, where practicable, via email to the address associated with your account.
            </p>
            <p>
              <strong>Your options:</strong> If you disagree with the updated Terms, you have the right to cancel your subscription and close your account before the new Terms come into effect, without penalty. Your continued use of the Service after the updated Terms take effect constitutes your acceptance of those changes.
            </p>
            <p>
              We maintain a record of previous versions of these Terms. If you would like to review a prior version, please contact us at{" "}
              <a href="mailto:legal@linkey.digital" className="text-[#0052D4] hover:underline">legal@linkey.digital</a>
              , and we will provide it to you promptly.
            </p>
          </SectionCard>

          <SectionCard id="contact" number="12" title="Contact Us" index={11}>
            <p>
              If you have any questions, concerns, or feedback regarding these Terms of Service, we encourage you to get in touch. Our legal team is available to clarify any aspect of these Terms and assist you with any related matters.
            </p>
            <p>
              <strong>Legal Department:</strong> LINKey Digital (Pty) Ltd
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@linkey.digital" className="text-[#0052D4] hover:underline">
                legal@linkey.digital
              </a>
              <br />
              <strong>General Support:</strong>{" "}
              <a href="mailto:support@linkey.digital" className="text-[#0052D4] hover:underline">
                support@linkey.digital
              </a>
              <br />
              <strong>Address:</strong> Cape Town, Western Cape, South Africa
            </p>
            <p>
              We aim to acknowledge all enquiries within 2 business days and provide a substantive response within 10 business days. For urgent matters related to account security or unauthorised access, please include "URGENT" in your email subject line, and we will prioritise your request.
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
              Questions about these terms?
            </h3>
            <p className="mb-4 text-[15px] text-[#454545] [line-height:1.75]">
              Our legal team is happy to clarify anything. Get in touch and we
              will respond promptly.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:legal@linkey.digital"
                className="inline-flex items-center gap-2 rounded-full bg-[#0052D4] px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                legal@linkey.digital
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
