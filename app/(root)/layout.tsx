"use client";

import Script from "next/script";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body>
      {children}
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.1/inject.js"
        strategy="afterInteractive"
      />
      {/* Add Botpress Webchat Configuration Script */}
      <Script
        src="https://mediafiles.botpress.cloud/9a2d0d2d-be80-4087-8c89-6ee455c6a5c3/webchat/v2.1/config.js"
        strategy="afterInteractive"
      />
      {/* <Botpress/> */}
    </body>
  );
};

export default HomeLayout;
