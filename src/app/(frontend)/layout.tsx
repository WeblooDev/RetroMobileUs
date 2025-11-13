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
        <Script id="unity-utm-capture" strategy="afterInteractive">
          {`
            (function () {
              if (typeof window === 'undefined') return;

              function processLinks() {
                var dcdomains = [
                  'unitytickets.com',
                  'myshowlead.com',
                  'myshowapp.com',
                  'unityeventsolutions.com',
                  'retromobile.us',
                  'retro-mobile-us.vercel.app'
                ];

                var params = window.location.search.replace(/ +/g, '%20');
                if (params.length > 0 && params[0] === '?') {
                  params = params.substring(1);
                }

                var finalList = '';

                if (params.length > 0) {
                  var splitList = params.split('&');
                  var append = [];
                  for (var idx = 0; idx < splitList.length; idx++) {
                    if (splitList[idx].indexOf('utm_') === 0) {
                      append.push(splitList[idx]);
                    }
                  }
                  finalList = append.join('&');
                }

                if (finalList.length > 0) {
                  var links = document.querySelectorAll('a[href]');
                  links.forEach(function (link) {
                    for (var idx = 0; idx < dcdomains.length; idx++) {
                      var domain = dcdomains[idx];
                      var re = new RegExp('^http[s]?://[a-zA-Z.]{0,15}' + domain + '.*$');

                      if (link.href.indexOf('#') < 0 && re.test(link.href)) {
                        if (link.href.indexOf('?') < 0) {
                          link.href = link.href + '?' + finalList;
                        } else {
                          link.href = link.href + '&' + finalList;
                        }
                      }
                    }
                  });
                }
              }

              // Process links when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', processLinks);
              } else {
                processLinks();
              }

              // Re-process links when new content is added (for dynamic content)
              if (typeof MutationObserver !== 'undefined') {
                var observer = new MutationObserver(function(mutations) {
                  var hasNewLinks = false;
                  mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeType === 1 && (node.tagName === 'A' || node.querySelector('a'))) {
                        hasNewLinks = true;
                      }
                    });
                  });
                  if (hasNewLinks) {
                    processLinks();
                  }
                });
                observer.observe(document.body, { childList: true, subtree: true });
              }
            })();
          `}
        </Script>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9R48X46FZC"></script>
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXPNNJ9C');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google Tag Manager - Additional */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WLSNP8D');`,
          }}
        />
        {/* End Google Tag Manager - Additional */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXPNNJ9C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Google Tag Manager (noscript) - Additional */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLSNP8D"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) - Additional */}
        <UnityTicketsScript />
        <Providers>
          <Header />
          <BreadcrumbLayout>{children}</BreadcrumbLayout>
          <Footer />
          <FloatingTicketCTA title="TICKETS" />
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
