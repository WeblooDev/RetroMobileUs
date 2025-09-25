import Script from 'next/script'
import React from 'react'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); // Optional: persist dark mode in localStorage
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
