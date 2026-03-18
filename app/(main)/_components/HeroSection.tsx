export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-[#EEF0FF] via-[#F4F7FF] to-white" />
      </div>

      {/* Decorative concentric circles */}
      <div className="pointer-events-none absolute top-1/2 right-0 -z-5 -translate-y-1/2 translate-x-[10%]">
        <div className="relative h-175 w-175 lg:h-200 lg:w-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C7D2FE]/40"
              style={{
                width: `${i * 160}px`,
                height: `${i * 160}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#6366F1] uppercase">
              Redesigning Connection
            </p>
            <h1 className="mt-4 text-5xl leading-[1.1] font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-[64px]">
              The Intelligent Networking Ecosystem.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Seamlessly exchange contact details, capture qualified leads, and
              grow your network with Linky&apos;s digital NFC cards and
              intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#get-card"
                className="inline-flex items-center rounded-full bg-linear-to-r from-[#5D52BF] to-[#4dafd7] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                Get Your Linky Card
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:shadow-sm"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right Content — Phone + Card Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* WiFi signal icons */}
            <WifiSignal className="absolute -top-4 right-[45%] text-[#6366F1]/60" />
            <WifiSignal className="absolute top-16 right-[15%] text-[#6366F1]/40" size={20} />

            {/* Phone Mockup */}
            <div className="relative z-10 w-65 sm:w-70">
              <PhoneMockup />
            </div>

            {/* NFC Card — overlapping the phone */}
            <div className="absolute bottom-8 -left-4 z-20 sm:bottom-12 sm:left-0 lg:-left-12">
              <NFCCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── WiFi Signal Icon ──────────────────────────────── */
function WifiSignal({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19.5a1 1 0 100-2 1 1 0 000 2z"
        fill="currentColor"
      />
      <path
        d="M8.46 15.54a5 5 0 017.08 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.29 12.37a9 9 0 0113.42 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.1 9.21a13 13 0 0119.8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Phone Mockup ──────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="rounded-[40px] border border-gray-200 bg-white p-2 shadow-2xl shadow-black/10">
      <div className="rounded-4xl bg-gray-50 overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[10px] font-semibold text-gray-800">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
              <rect x="0" y="4" width="2.5" height="6" rx="0.5" />
              <rect x="3.5" y="2.5" width="2.5" height="7.5" rx="0.5" />
              <rect x="7" y="1" width="2.5" height="9" rx="0.5" />
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
            </svg>
          </div>
        </div>

        {/* Profile header */}
        <div className="flex flex-col items-center px-4 pt-2 pb-4">
          <div className="h-16 w-16 rounded-full bg-linear-to-br from-[#C4B5FD] to-[#93C5FD] p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"
                  fill="#9CA3AF"
                />
              </svg>
            </div>
          </div>
          <h3 className="mt-2 text-sm font-bold text-gray-900">
            Lalena Peantiy
          </h3>
          <p className="text-[10px] text-gray-500">
            Digital Marketing Specialist
          </p>

          {/* Action buttons */}
          <div className="mt-3 flex gap-2">
            <button className="rounded-full bg-[#6366F1] px-4 py-1 text-[10px] font-medium text-white">
              Events
            </button>
            <button className="rounded-full border border-gray-200 px-4 py-1 text-[10px] font-medium text-gray-600">
              Connect
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-4 grid grid-cols-3 gap-2 rounded-xl bg-white p-3 shadow-sm">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">73</p>
            <p className="text-[9px] text-gray-500">Connections</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">33</p>
            <p className="text-[9px] text-gray-500">Interactions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">26</p>
            <p className="text-[9px] text-gray-500">Meetings</p>
          </div>
        </div>

        {/* Tags section */}
        <div className="px-4 pt-4 pb-1">
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-medium text-[#EC4899]">Top</span>
            <span className="text-[9px] text-gray-500">Your featured profile</span>
          </div>
        </div>

        {/* Activity items */}
        <div className="space-y-2 px-4 py-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm"
            >
              <div className="h-6 w-6 rounded-full bg-gray-100" />
              <div className="flex-1">
                <div className="h-2 w-3/4 rounded bg-gray-200" />
                <div className="mt-1 h-1.5 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="px-4 py-3">
          <p className="font-serif text-sm italic text-gray-400">
            Tingi Cuartverchs, Ermoc.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── NFC Card ──────────────────────────────────────── */
function NFCCard() {
  return (
    <div className="w-65 sm:w-75 rotate-[-8deg]">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1F2937] via-[#374151] to-[#111827] p-6 shadow-2xl shadow-black/30">
        {/* Subtle shine */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.07] to-transparent" />

        {/* Contactless icon */}
        <div className="flex justify-between">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-400"
          >
            <path
              d="M6.5 13a4.5 4.5 0 019 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M4 13a8 8 0 0116 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {/* Chip */}
          <div className="h-7 w-9 rounded-sm bg-linear-to-br from-[#D4AF37] to-[#C5972C] opacity-80" />
        </div>

        {/* Card branding */}
        <div className="mt-8 flex items-center gap-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
          >
            <rect width="28" height="28" rx="6" fill="white" fillOpacity="0.15" />
            <text
              x="14"
              y="20"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              L
            </text>
          </svg>
          <span className="text-lg font-bold text-white">Linky</span>
        </div>
      </div>
    </div>
  );
}
