"use client";
import Script from "next/script";

export default function Home() {
  return (
    <div>
      CHATBOT
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.1/inject.js"
        strategy="afterInteractive"
      />
      {/* Add Botpress Webchat Configuration Script */}
      <Script
        src="https://mediafiles.botpress.cloud/9a2d0d2d-be80-4087-8c89-6ee455c6a5c3/webchat/v2.1/config.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
