import { cn } from '@/utilities/ui'
import type { Metadata } from 'next'
import { inter } from './fonts'
import React from 'react'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbLayout } from '@/components/Breadcrumb/BreadcrumbLayout'
import 'react-loading-skeleton/dist/skeleton.css'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { UnityTicketsScript } from '@/components/UnityTicketsScript'
import Script from 'next/script'
import { FirstVisitPopup } from '@/components/FirstVisitPopup/FirstVisitPopup'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
      <head>


        
        {/* Google Tag Manager */}
        <Script
          id="gtm-t93hfvsb"
          strategy="afterInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T93HFVSB');`}</Script>
        {/* End Google Tag Manager */}

        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="robots" content="index, follow" />
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T93HFVSB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <UnityTicketsScript />

           <FirstVisitPopup
            title="The Retromobile team wishes you a wonderful New Year"
            description="SEE YOU IN NEW YORK IN 2026!"
          />
          
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
