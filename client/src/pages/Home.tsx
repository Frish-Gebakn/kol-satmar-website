/**
 * KOL SATMAR — Home Page (v2)
 * Design: Royal Dark Elegance — deep midnight + luminous gold
 * The official emblem (gold crown + palms) is the dramatic hero centerpiece,
 * echoed by ambient gold glows and ornate gold detailing throughout.
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
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[oklch(0.72_0.12_84/65%)]" />
      <svg width="36" height="16" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2 L22 8 L18 14 L14 8 Z" fill="oklch(0.78 0.12 86)" opacity="0.85" />
        <circle cx="5" cy="8" r="2" fill="oklch(0.72 0.12 84)" opacity="0.5" />
        <circle cx="31" cy="8" r="2" fill="oklch(0.72 0.12 84)" opacity="0.5" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[oklch(0.72_0.12_84/65%)]" />
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
      <div className="absolute top-0 right-0 w-7 h-7 opacity-30 pointer-events-none">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M28 0 L28 10 M28 0 L18 0" stroke="oklch(0.72 0.12 84)" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-7 h-7 opacity-30 pointer-events-none">
        <svg viewBox="0 0 28 28" fill="none">
          <path d="M0 28 L0 18 M0 28 L10 28" stroke="oklch(0.72 0.12 84)" strokeWidth="2" />
        </svg>
      </div>

      <div className="text-center">
        <h3 className="font-hebrew text-lg font-bold text-gold-light leading-tight" dir="rtl">
          {region}
        </h3>
        <p className="font-cinzel text-xs text-[oklch(0.62_0.05_82)] tracking-widest uppercase mt-0.5">
          {regionEn}
        </p>
      </div>

      <div className="gold-divider w-full" />

      <div className="flex flex-col items-center gap-2 w-full">
        {numbers.map((n) => (
          <a
            key={n.tel}
            href={`tel:${n.tel}`}
            className="font-cinzel text-base font-semibold text-[oklch(0.80_0.10_86)] hover:text-[oklch(0.88_0.10_90)] tracking-wider transition-all duration-150 hover:scale-105 active:scale-95"
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

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.16 0.015 70)" }}
    >
      {/* Ambient gold glows */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(900px 520px at 50% -8%, oklch(0.72 0.12 84 / 13%), transparent 65%),
            radial-gradient(700px 600px at 108% 102%, oklch(0.72 0.12 84 / 6%), transparent 60%),
            radial-gradient(700px 600px at -8% 102%, oklch(0.72 0.12 84 / 6%), transparent 60%)
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
            opacity: heroVisible ? 0.55 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div className="flex flex-col items-center gap-1 text-[oklch(0.68_0.09_84)]">
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
          background: "oklch(0.185 0.018 72 / 75%)",
          borderTop: "1px solid oklch(0.72 0.12 84 / 15%)",
          borderBottom: "1px solid oklch(0.72 0.12 84 / 15%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title font-hebrew text-3xl sm:text-4xl font-bold mb-3" dir="rtl">
              לאקאלע נומערן
            </h2>
            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-[oklch(0.60_0.05_82)]">
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
              <h2 className="font-hebrew text-2xl sm:text-3xl font-bold text-gold-light mb-2" dir="rtl">
                הערט קול סאטמאר אנליין
              </h2>
              <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[oklch(0.60_0.05_82)]">
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
          background: "oklch(0.185 0.018 72 / 75%)",
          borderTop: "1px solid oklch(0.72 0.12 84 / 15%)",
          borderBottom: "1px solid oklch(0.72 0.12 84 / 15%)",
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
            <p className="font-cinzel text-xs tracking-[0.2em] uppercase text-[oklch(0.60_0.05_82)] mb-6">
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

      {/* ===== FOOTER ===== */}
      <footer
        className="relative z-10 py-10 px-4"
        style={{
          borderTop: "1px solid oklch(0.72 0.12 84 / 22%)",
          background: "oklch(0.14 0.013 70)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Contact Left */}
            <div className="flex flex-col items-center md:items-start gap-2 flex-1">
              <h4 className="font-cinzel text-sm font-bold text-gold mb-1 tracking-wider">
                Contact Us
              </h4>
              <a
                href="mailto:support@kolsatmar.org"
                className="text-sm text-[oklch(0.74_0.04_84)] hover:text-gold-light transition-colors"
              >
                support@kolsatmar.org
              </a>
              <a
                href="tel:18454442738"
                className="font-cinzel text-sm text-[oklch(0.74_0.04_84)] hover:text-gold-light transition-colors tracking-wider"
              >
                1-845-444-2738
              </a>
              <p className="text-xs text-[oklch(0.58_0.03_82)] mt-1">
                Operated by Lipa Goldberger
              </p>
            </div>

            {/* Logo center */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="קול סאטמאר"
                className="w-40 opacity-85"
                style={{ filter: "drop-shadow(0 0 14px oklch(0.72 0.12 84 / 22%))" }}
              />
            </div>

            {/* Privacy Right */}
            <div className="flex flex-col items-center md:items-end gap-2 flex-1">
              <h4 className="font-cinzel text-sm font-bold text-gold mb-1 tracking-wider">
                Privacy Policy
              </h4>
              <p className="text-xs text-[oklch(0.62_0.03_82)] leading-relaxed text-center md:text-right max-w-xs">
                No mobile information will be shared with third parties/affiliates for
                marketing/promotional purposes. Text messaging originator opt-in data and consent
                will not be shared with any third parties.
              </p>
            </div>
          </div>

          <div className="gold-divider mb-5" />
          <div className="text-center">
            <p className="font-cinzel text-xs text-[oklch(0.58_0.04_82)] tracking-wider">
              © 2026 קול סאטמאר · Kol Satmar · All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
