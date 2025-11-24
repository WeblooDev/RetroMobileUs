import { cn } from '@/utilities/ui'
import type { Metadata } from 'next'
import { inter } from './fonts'
import React from 'react'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { FacebookPixelScript } from '@/components/FaceBookScript'
import { BreadcrumbLayout } from '@/components/Breadcrumb/BreadcrumbLayout'
import 'react-loading-skeleton/dist/skeleton.css'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import FloatingTicketCTA from '@/components/FloatingTicketCTA'
import { UnityTicketsScript } from '@/components/UnityTicketsScript'
import Script from 'next/script'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
      <head>
        {/* === Google Tag Manager: GTM-T93HFVSB (HEAD) === */}
        <Script
          id="gtm-t93hfvb-head"
          strategy="afterInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T93HFVSB');`}</Script>

        {/* === End Google Tag Manager: GTM-T93HFVSB (HEAD) === */}

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9R48X46FZC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9R48X46FZC', {
                'linker': {
                  'domains': ['dupontregistry.com', 'leasing.dupontregistry.com']
                }
              });
            `,
          }}
        />

        {/* Google Tag Manager (existing TXPNNJ9C) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXPNNJ9C');`,
          }}
        />
        {/* Google Tag Manager (existing WLSNP8D) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WLSNP8D');`,
          }}
        />
        {/* End existing Google Tag Managers */}

        <FacebookPixelScript />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="kpzRBe3JFD3txArPg0zrleykLgItyFiw-phvIjgH8Ag"
        />
      </head>

      <body>
        {/* === Google Tag Manager (noscript) : GTM-T93HFVSB === */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T93HFVSB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* === End Google Tag Manager (noscript) : GTM-T93HFVSB === */}

        {/* Existing GTM noscripts – keep if you still need those containers */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXPNNJ9C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLSNP8D"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End existing GTM noscripts */}

        <UnityTicketsScript />
        <Providers>
          <Header />
          <BreadcrumbLayout>{children}</BreadcrumbLayout>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@dupontregistry',
  },
  robots: {
    index: true,
    follow: true,
  },
}
