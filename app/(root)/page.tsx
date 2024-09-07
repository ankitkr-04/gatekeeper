"use client";
import ActionCard from "@/components/ActionCard";
import { cardLinks } from "@/constants";
import Script from "next/script";

export default function Home() {
  return (
    <div className="mx-auto  flex max-w-3xl items-center justify-center sm:justify-between">
      <div className="grid gap-8 sm:grid-cols-2 ">
        {cardLinks.map((card) => (
          <ActionCard
            key={card.value}
            value={card.value}
            icon={card.icon}
            label={card.label}
            description={card.description}
          />
        ))}
      </div>
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
