/**
 * KOL SATMAR — Home Page (v3)
 * Design: Royal Light Elegance — warm ivory parchment + burnished gold + deep brown
 * The official emblem (gold crown + palms) is the dramatic hero centerpiece.
 */

import { useEffect, useRef, useState } from "react";
import { LOGO_DATA_URL } from "@/lib/logo";

const LOGO_URL = LOGO_DATA_URL;

const localNumbers = [
  {
    region: "קרית יואל",
    regionEn: "Kiryas Joel",
    numbers: [{ number: "845-537-4000", tel: "+18455374000" }],
  },
  {
    region: "אפסטעיט",
    regionEn: "Upstate",
    numbers: [
      { number: "845-951-1110", tel: "+18459511110" },
      { number: "845-414-8018", tel: "+18454148018" },
    ],
  },
  {
    region: "ברוקלין",
    regionEn: "Brooklyn",
    numbers: [
      { number: "718-689-1010", tel: "+17186891010" },
      { number: "718-887-9288", tel: "+17188879288" },
    ],
  },
  {
    region: "לאנדאן / מאנטשעסטער",
    regionEn: "London / Manchester",
    numbers: [{ number: "+44 330-551-1714", tel: "+443305511714" }],
  },
  {
    region: "ארץ ישראל",
    regionEn: "Eretz Yisroel",
    numbers: [{ number: "072.333.3395", tel: "+972723333395" }],
  },
  {
    region: "אויסטראליע",
    regionEn: "Australia",
    numbers: [{ number: "+61 240183912", tel: "+61240183912" }],
  },
  {
    region: "בראזיל",
    regionEn: "Brazil",
    numbers: [{ number: "+55 31-97614-9605", tel: "+5531976149605" }],
  },
  {
    region: "אנטווערפן",
    regionEn: "Antwerp",
    numbers: [{ number: "+32 480-201-265", tel: "+32480201265" }],
  },
];

// Intersection observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// Gold ornamental divider
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[oklch(0.62_0.12_82/55%)]" />
      <svg width="36" height="16" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2 L22 8 L18 14 L14 8 Z" fill="oklch(0.62 0.12 82)" opacity="0.80" />
        <circle cx="5" cy="8" r="2" fill="oklch(0.62 0.12 82)" opacity="0.45" />
        <circle cx="31" cy="8" r="2" fill="oklch(0.62 0.12 82)" opacity="0.45" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[oklch(0.62_0.12_82/55%)]" />
    </div>
  );
}

// Phone number card
function PhoneCard({
  region,
  regionEn,
  numbers,
  delay = 0,
  inView,
}: {
  region: string;
  regionEn: string;
  numbers: { number: string; tel: string }[];
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      className="phone-card rounded-lg p-5 flex flex-col items-center gap-3 relative overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms, border-color 220ms, box-shadow 220ms`,
      }}
    >
      {/* Gold corner accents */}
      <div className="absolute top-0 right-0 w-7 h-7 opacity-25 pointer-events-none">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M28 0 L28 10 M28 0 L18 0" stroke="oklch(0.62 0.12 82)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-7 h-7 opacity-25 pointer-events-none">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M0 28 L0 18 M0 28 L10 28" stroke="oklch(0.62 0.12 82)" strokeWidth="2" />
        </svg>
      </div>

      <div className="text-center">
        <h3 className="font-hebrew text-lg font-bold leading-tight text-[oklch(0.32_0.06_78)]" dir="rtl">
          {region}
        </h3>
        <p className="font-cinzel text-xs text-[oklch(0.55_0.05_80)] tracking-widest uppercase mt-0.5">
          {regionEn}
        </p>
      </div>

      <div className="gold-divider w-full" />

      <div className="flex flex-col items-center gap-2 w-full">
        {numbers.map((n) => (
          <a
            key={n.tel}
            href={`tel:${n.tel}`}
            className="font-cinzel text-base font-semibold tracking-wider transition-all duration-150 hover:scale-105 active:scale-95 text-[oklch(0.48_0.10_78)] hover:text-[oklch(0.38_0.10_76)]"
            style={{ direction: "ltr", display: "block" }}
          >
            {n.number}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const { ref: numbersRef, inView: numbersInView } = useInView(0.05);
  const { ref: listenRef, inView: listenInView } = useInView(0.3);
  const { ref: updatesRef, inView: updatesInView } = useInView(0.3);
  const { ref: aboutRef, inView: aboutInView } = useInView(0.15);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.97 0.008 80)" }}
    >
      {/* Subtle ambient gold glow at top */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(900px 400px at 50% -5%, oklch(0.62 0.12 82 / 7%), transparent 65%),
            radial-gradient(600px 500px at 105% 100%, oklch(0.62 0.12 82 / 4%), transparent 60%),
            radial-gradient(600px 500px at -5% 100%, oklch(0.62 0.12 82 / 4%), transparent 60%)
          `,
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <header
        ref={heroRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 py-16 text-center"
      >
        {/* Emblem */}
        <div
          className="emblem-glow mb-5 md:mb-7"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "scale(1)" : "scale(0.93)",
            transition:
              "opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <img
            src={LOGO_URL}
            alt="קול סאטמאר — אפיציעלער סימבאל"
            className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[580px] max-w-full"
          />
        </div>

        {/* Central phone number — big CTA */}
        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.8s cubic-bezier(0.23,1,0.32,1) 600ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) 600ms",
          }}
        >
          <a
            href="tel:+16056157777"
            className="btn-gold inline-block font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest px-9 py-4 rounded-lg"
            style={{ direction: "ltr" }}
          >
            605-615-7777
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: heroVisible ? 0.50 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div className="flex flex-col items-center gap-1 text-[oklch(0.55_0.08_80)]">
            <span className="font-hebrew text-xs" dir="rtl">
              דריקט ארונטער
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
              <path
                d="M10 4 L10 16 M5 11 L10 16 L15 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      {/* ===== LOCAL NUMBERS SECTION ===== */}
      <section
        ref={numbersRef}
        className="relative z-10 py-16 px-4"
        style={{
          background: "oklch(0.94 0.012 80)",
          borderTop: "1px solid oklch(0.62 0.12 82 / 18%)",
          borderBottom: "1px solid oklch(0.62 0.12 82 / 18%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title font-hebrew text-3xl sm:text-4xl font-bold mb-3" dir="rtl">
              לאקאלע נומערן
            </h2>
            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[oklch(0.52_0.05_80)]">
              Local Numbers Worldwide
            </p>
            <GoldDivider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {localNumbers.map((loc, i) => (
              <PhoneCard
                key={loc.region}
                region={loc.region}
                regionEn={loc.regionEn}
                numbers={loc.numbers}
                delay={i * 70}
                inView={numbersInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LISTEN ONLINE SECTION ===== */}
      <section ref={listenRef} className="relative z-10 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              opacity: listenInView ? 1 : 0,
              transform: listenInView ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <div className="mb-6">
              <div className="gold-divider max-w-xs mx-auto mb-6" />
              <h2 className="font-hebrew text-2xl sm:text-3xl font-bold mb-2 text-[oklch(0.28_0.06_76)]" dir="rtl">
                הערט קול סאטמאר אנליין
              </h2>
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.05_80)]">
                Listen to Kol Satmar Online
              </p>
            </div>

            <a
              href="https://portal.voitex.com/publiclibrary/viewLib/Kol-Satmar/5f06226934328"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3 font-cinzel text-base font-bold px-8 py-4 rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 6.5 L14 10 L8 13.5 Z" fill="currentColor" />
              </svg>
              <span dir="rtl" className="font-hebrew text-lg">
                דריקט דא צו הערן
              </span>
            </a>

            <div className="gold-divider max-w-xs mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* ===== UPDATES SECTION ===== */}
      <section
        ref={updatesRef}
        className="relative z-10 py-14 px-4"
        style={{
          background: "oklch(0.94 0.012 80)",
          borderTop: "1px solid oklch(0.62 0.12 82 / 18%)",
          borderBottom: "1px solid oklch(0.62 0.12 82 / 18%)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              opacity: updatesInView ? 1 : 0,
              transform: updatesInView ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <h2 className="section-title font-hebrew text-2xl sm:text-3xl font-bold mb-3" dir="rtl">
              אפדעיטס
            </h2>
            <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[oklch(0.52_0.05_80)] mb-6">
              Latest Updates
            </p>
            <GoldDivider />
            <div className="mt-6">
              <a
                href="https://kolsatmar.org/#updates"
                className="btn-gold-outline inline-block font-hebrew text-lg px-7 py-3 rounded-lg"
                dir="rtl"
              >
                דריקט דא צו זען די לעצטע אפדעיטס ←
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT / BUSINESS INFORMATION SECTION =====
          Required by the mobile carriers for A2P 10DLC brand verification: the
          business address, phone number and email must appear on the home page,
          together with an about section and a plain-English description of what
          this service is. That is why this block is in English and why the
          address, email and phone are visible WITHOUT expanding anything - a
          human reviewer opens the page and has to see them. Only the longer
          detail is folded away.

          It is a <details> element rather than React state on purpose: the
          collapsed content stays in the DOM, so an automated crawler still
          reads it. */}
      <section ref={aboutRef} className="relative z-10 py-14 px-4" dir="ltr">
        <div className="max-w-3xl mx-auto">
          <div
            style={{
              opacity: aboutInView ? 1 : 0,
              transform: aboutInView ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.7s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <div className="text-center mb-6">
              <h2 className="section-title font-cinzel text-2xl sm:text-3xl font-bold mb-2">
                About Kol Satmar
              </h2>
              <p className="font-hebrew text-sm text-[oklch(0.52_0.05_80)]" dir="rtl">
                אודות קול סאטמאר
              </p>
              <GoldDivider />
            </div>

            <div className="phone-card rounded-lg p-6 sm:p-8">
              <p className="text-[15px] leading-relaxed text-[oklch(0.36_0.05_78)]">
                <strong>Kol Satmar</strong> is a community telephone information
                line serving Yiddish-speaking Jewish communities in the United
                States, England, Israel, Australia, Brazil and Belgium. Callers
                dial a local number to hear community announcements, news
                updates, lectures and recorded audio content in Yiddish, free of
                charge, 24 hours a day. The same recordings can be played online,
                and members who ask for it also receive short text-message
                notifications.
              </p>
              <p className="text-[15px] leading-relaxed text-[oklch(0.36_0.05_78)] mt-3">
                Kol Satmar is operated as a sole proprietorship by{" "}
                <strong>Lipa Goldberger</strong> in Kiryas Joel, New York.
              </p>

              <div className="gold-divider my-5" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 text-sm text-[oklch(0.42_0.06_78)]">
                <div>
                  <p className="font-cinzel text-xs font-bold tracking-wider text-[oklch(0.48_0.10_78)] mb-1">
                    ADDRESS
                  </p>
                  <p className="leading-relaxed">
                    Kol Satmar
                    <br />
                    12 Fillmore Ct. #312
                    <br />
                    Kiryas Joel, NY 10950
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <p className="font-cinzel text-xs font-bold tracking-wider text-[oklch(0.48_0.10_78)] mb-1">
                    CONTACT
                  </p>
                  <p className="leading-relaxed">
                    <a
                      href="mailto:support@kolsatmar.org"
                      className="hover:text-[oklch(0.35_0.08_76)] transition-colors"
                    >
                      support@kolsatmar.org
                    </a>
                    <br />
                    <a
                      href="tel:+18454442738"
                      className="font-cinzel tracking-wider hover:text-[oklch(0.35_0.08_76)] transition-colors"
                    >
                      1-845-444-2738
                    </a>
                  </p>
                </div>
              </div>

              <details className="mt-5">
                {/* list-none hides the default triangle everywhere except
                    Safari, which needs the -webkit-details-marker rule too. */}
                <summary className="btn-gold-outline inline-flex items-center gap-2 font-cinzel text-sm font-semibold px-5 py-2 rounded-lg cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                  <span>Our services &amp; SMS program</span>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M5 8 L10 13 L15 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>

                <div className="mt-5 text-sm leading-relaxed text-[oklch(0.40_0.05_78)]">
                  <h3 className="font-cinzel text-base font-bold text-[oklch(0.38_0.08_78)] mb-2">
                    Our services
                  </h3>
                  <ul className="list-disc ps-5 space-y-1.5">
                    <li>
                      <strong>Telephone information line</strong> — local access
                      numbers in eight regions worldwide, available 24 hours a
                      day at no charge to the caller.
                    </li>
                    <li>
                      <strong>Online listening</strong> — the same recordings
                      through our web player.
                    </li>
                    <li>
                      <strong>SMS notifications</strong> — short text updates for
                      community members who ask to receive them.
                    </li>
                  </ul>

                  <div className="gold-divider my-5" />

                  <h3 className="font-cinzel text-base font-bold text-[oklch(0.38_0.08_78)] mb-2">
                    SMS notification program
                  </h3>
                  <p>
                    Community members may ask to receive short text-message
                    notifications, such as the daily time of the afternoon
                    (Mincha) prayer service.
                  </p>
                  <ul className="list-disc ps-5 space-y-1.5 mt-2">
                    <li>
                      <strong>How to join:</strong> ask in person, or call or
                      text us at 1-845-444-2738. Members are added by hand; there
                      is no automatic sign-up form.
                    </li>
                    <li>
                      <strong>Message frequency:</strong> about one message per
                      weekday.
                    </li>
                    <li>
                      <strong>Cost:</strong> message and data rates may apply.
                    </li>
                    <li>
                      <strong>To stop:</strong> reply <strong>STOP</strong> to any
                      message. Reply <strong>HELP</strong> for help, or email{" "}
                      <a
                        href="mailto:support@kolsatmar.org"
                        className="underline hover:text-[oklch(0.35_0.08_76)]"
                      >
                        support@kolsatmar.org
                      </a>
                      .
                    </li>
                  </ul>
                  <p className="mt-3 text-[13px] text-[oklch(0.50_0.04_80)]">
                    No mobile information will be shared with third parties or
                    affiliates for marketing or promotional purposes. Text
                    messaging originator opt-in data and consent will not be
                    shared with any third parties.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="relative z-10 py-10 px-4"
        style={{
          borderTop: "1px solid oklch(0.62 0.12 82 / 22%)",
          background: "oklch(0.93 0.014 80)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Contact Left */}
            <div className="flex flex-col items-center md:items-start gap-2 flex-1">
              <h4 className="font-cinzel text-sm font-bold text-[oklch(0.48_0.10_78)] mb-1 tracking-wider">
                Contact Us
              </h4>
              {/* The postal address is repeated here as well as in the About
                  section: carrier brand verification looks for it, and a footer
                  is the first place a reviewer scrolls to. */}
              <address className="text-sm not-italic text-[oklch(0.42_0.06_78)] leading-relaxed text-center md:text-left">
                12 Fillmore Ct. #312
                <br />
                Kiryas Joel, NY 10950
                <br />
                United States
              </address>
              <a
                href="mailto:support@kolsatmar.org"
                className="text-sm text-[oklch(0.42_0.06_78)] hover:text-[oklch(0.35_0.08_76)] transition-colors"
              >
                support@kolsatmar.org
              </a>
              <a
                href="tel:18454442738"
                className="font-cinzel text-sm text-[oklch(0.42_0.06_78)] hover:text-[oklch(0.35_0.08_76)] transition-colors tracking-wider"
              >
                1-845-444-2738
              </a>
              <p className="text-xs text-[oklch(0.58_0.04_80)] mt-1">
                Operated by Lipa Goldberger
              </p>
            </div>

            {/* Logo center */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="קול סאטמאר"
                className="w-40 opacity-90"
                style={{ filter: "drop-shadow(0 2px 10px oklch(0.62 0.12 82 / 18%))" }}
              />
            </div>

            {/* Privacy Right */}
            <div className="flex flex-col items-center md:items-end gap-2 flex-1">
              <h4 className="font-cinzel text-sm font-bold text-[oklch(0.48_0.10_78)] mb-1 tracking-wider">
                Privacy Policy
              </h4>
              <p className="text-xs text-[oklch(0.48_0.04_80)] leading-relaxed text-center md:text-right max-w-xs">
                No mobile information will be shared with third parties/affiliates for
                marketing/promotional purposes. Text messaging originator opt-in data and consent
                will not be shared with any third parties.
              </p>
            </div>
          </div>

          <div className="gold-divider mb-5" />
          <div className="text-center">
            <p className="font-cinzel text-xs text-[oklch(0.52_0.05_80)] tracking-wider">
              © 2026 קול סאטמאר · Kol Satmar · All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
