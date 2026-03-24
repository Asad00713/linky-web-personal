import { FAQSection as FAQSectionComponent } from "@/components/sections/FAQSection";

const faqs = [
  {
    question: "What is LINKey Digital?",
    answer:
      "LINKey Digital is South Africa's leading digital business card and networking platform. It lets you create, share, and manage your professional identity through NFC cards, QR codes, and smart links — all from one intuitive dashboard.",
  },
  {
    question: "How much does LINKey cost?",
    answer:
      "LINKey offers three plans: Free (basic digital card), Pro at R199 per month (analytics, NFC, Card Swop, CRM lite), and Business at R599 per month (team cards, full CRM, campaign manager, priority support). All plans come with a 14-day free trial.",
  },
  {
    question: "Do I need an app to use LINKey?",
    answer:
      "No app is needed to receive or view a LINKey card — recipients simply tap or scan and the card opens in their browser. The LINKey app is optional and gives you extra management features like analytics, Card Swop history, and loyalty wallet.",
  },
  {
    question: "How does NFC sharing work?",
    answer:
      "Simply hold your LINKey NFC card or phone near someone's device. The NFC chip transmits your card link instantly — no app download required on their end. It works with any modern smartphone and takes less than a second to share your full professional profile.",
  },
  {
    question: "What is Card Swop?",
    answer:
      "Card Swop is LINKey's signature bilateral exchange feature. When two LINKey users tap phones, both cards are exchanged simultaneously — no more one-sided sharing. It's the digital equivalent of swapping business cards, but smarter, with instant CRM capture.",
  },
  {
    question: "Can I use LINKey for my team?",
    answer:
      "Absolutely. The Business plan lets you create and manage branded digital cards for your entire team. You control the design, approve profiles, and track all networking activity through a central dashboard. Roll out to 100+ staff in minutes.",
  },
  {
    question: "Is LINKey available in South Africa?",
    answer:
      "LINKey was built in South Africa, for South African professionals and businesses. We're fully POPIA compliant, price in rands, and offer local support. Our NFC cards ship from Johannesburg with 2-3 day delivery nationwide.",
  },
  {
    question: "How do I get an NFC card?",
    answer:
      "Order your personalised NFC card from our online shop. Choose your design, upload your logo, and we'll ship it to you. Activation takes about 30 seconds — just scan the card with your phone and link it to your LINKey profile.",
  },
  {
    question: "Can I integrate with my CRM?",
    answer:
      "Yes. LINKey integrates directly with Salesforce, HubSpot, and Marketo. For other platforms, we offer Zapier integration so you can connect to over 5,000 apps. Every card view, tap, and swop can automatically push data to your CRM.",
  },
  {
    question: "What analytics does LINKey provide?",
    answer:
      "LINKey tracks card views, QR scans, NFC taps, contact saves, geographic location of viewers, device types, and engagement over time. Pro and Business users get detailed dashboards with exportable reports and team-wide performance metrics.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted with AES-256 both in transit and at rest. LINKey is fully POPIA compliant with SOC 2 certification in progress. We never sell your data, and you retain full ownership of your contacts and analytics at all times.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Cancel anytime directly from your dashboard — there are no lock-in contracts or cancellation fees. Your data remains accessible for 30 days after cancellation, and you can export all contacts and analytics before you go. We make it hassle-free.",
  },
];

export default function HomeFAQSection() {
  return (
    <FAQSectionComponent
      eyebrow="Got Questions?"
      title="Frequently Asked Questions"
      description="Everything you need to know about LINKey Digital."
      faqs={faqs}
    />
  );
}
