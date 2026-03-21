"use client";

import Script from "next/script";

/**
 * AdSense loader — manual ad slots ONLY (auto-ads disabled).
 *
 * Usage:
 *   1. Add <AdSenseScript /> once in your layout or page (loads the library).
 *   2. Use <AdSenseSlot /> wherever you want an ad unit.
 *
 * Set NEXT_PUBLIC_ADSENSE_CLIENT in .env (e.g., "ca-pub-1234567890").
 */

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/** Drop this once per page/layout to load the AdSense library */
export function AdSenseScript() {
  if (!CLIENT_ID) return null;

  return (
    <>
      {/* Disable auto-ads — only manual slots will render */}
      <Script id="adsense-disable-auto" strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "${CLIENT_ID}",
          enable_page_level_ads: false
        });`}
      </Script>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  );
}

/**
 * Individual ad slot placeholder.
 * When AdSense client ID is not configured, renders a visible placeholder
 * with fixed dimensions to avoid CLS.
 */
export function AdSenseSlot({
  slot,
  format = "auto",
  className = "",
}: {
  slot?: string;
  format?: string;
  className?: string;
}) {
  // Placeholder when AdSense is not configured
  if (!CLIENT_ID) {
    return (
      <div
        className={`bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ minHeight: 300, minWidth: 250 }}
      >
        Publicidad
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 300, minWidth: 250 }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <Script id={`adsense-push-${slot}`} strategy="lazyOnload">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
