import Link from 'next/link'
import { getGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import type { Footer as FooterType } from '@/payload-types'
import { Media } from '@/components/Media'

type Global = 'footer' // or your actual Global type

const getCachedGlobal =
  (slug: Global, depth = 0) =>
  async () =>
    getGlobal('footer', depth)

export async function Footer() {
  const footerData = (await getCachedGlobal('footer' as unknown as Global, 1)()) as FooterType
  const linkGroups = footerData?.linkGroups || []
  const partnerLogos = footerData?.partnerLogos || []

  return (
    <footer className="p-6 w-full">
      <div className="container">
        <div className="border-t sm:border-t-0">
          <div className="mt-4 flex flex-col items-center justify-center gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-4 2xl:gap-6">
            {/* LEFT COLUMN: main logo + socials */}
            <div className="flex min-h-auto flex-col items-center justify-between gap-4 xl:items-start lg:min-h-[250px]">
              <div className="mb-2 flex w-[60%] items-center justify-center sm:w-full md:w-fit">
                {typeof footerData.logo === 'object' && footerData.logo?.url && (
                  <Link href="/">
                    <Media
                      resource={footerData.logo}
                      alt="Footer Logo"
                      className="w-full min-w-[150px] max-w-[500px] md:max-w-[300px] h-auto object-contain cursor-pointer"
                      imgClassName="w-full max-w-[500px] md:max-w-[300px] h-auto object-contain"
                    />
                  </Link>
                )}
              </div>

              {Array.isArray(footerData.icons) && footerData.icons.length > 0 && (
                <div className="flex w-full items-center justify-between gap-6 p-2 md:w-fit lg:gap-8 xl:w-[80%] xl:gap-10">
                  {footerData.icons.map((iconObj, index) => (
                    <Link
                      href={iconObj.url}
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Media
                        resource={iconObj.icon}
                        alt={iconObj.label || `Footer Icon ${index}`}
                        className="flex h-[23px] w-[23px] items-center justify-center"
                        imgClassName="h-[23px] w-[23px]"
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* MIDDLE: link groups */}
            <div className="flex w-full flex-col items-center justify-between gap-12 px-4 md:gap-6 md:px-0 lg:flex-row lg:items-start lg:gap-20 xl:w-[60%]">
              {linkGroups.map((group, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center lg:items-start lg:justify-start lg:text-left gap-4"
                >
                  <h4 className="text-sm uppercase">{group.title}</h4>
                  <ul className="space-y-1 md:space-y-2">
                    {group.links?.map(({ link }, i) => (
                      <li key={i}>
                        <CMSLink className="text-sm hover:underline font-inter" {...link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* MOBILE PRIVACY (small screens) */}
            <div className="flex flex-col items-center justify-between gap-2 text-center font-inter sm:hidden">
              <Link
                href="https://www.dupontregistry.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline lg:text-[16px] hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 mb-8 flex items-center justify-center">
          <div className="h-px w-[80%] max-w-[380px] border-t border-[#336] md:w-full lg:max-w-full" />
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col items-center justify-between gap-2 text-center font-inter md:flex-row md:gap-4">
          {/* Copyright block */}
          {footerData?.copyright && (
            <div className="mb-6 flex flex-col items-center gap-1 text-center md:mb-0 md:flex-row">
              <p className="flex items-center gap-1 text-sm uppercase text-[#9D9D9D]">
                &copy; {new Date().getFullYear()}
              </p>
              <p className="text-base text-black">RETROMOBILE.</p>{' '}
              <p className="text-sm text-[#9D9D9D]">All Rights Reserved.</p>
            </div>
          )}

          {/* About + Partner logos */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/about-retromobile-usa" target="_blank" className="hover:underline">
              <p className="text-sm text-center md:text-lg">About Rétromobile USA</p>
            </Link>

            {Array.isArray(partnerLogos) && partnerLogos.length > 0 && (
              <div className="flex items-center gap-4">
                {partnerLogos.map((partner, idx) =>
                  partner.logo ? (
                    <Link
                      key={idx}
                      href={partner.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Media
                        resource={partner.logo}
                        alt={partner.label || 'Partner logo'}
                        className="w-[150px] h-auto"
                        imgClassName="w-full h-auto object-contain"
                      />
                    </Link>
                  ) : null,
                )}
              </div>
            )}
          </div>

          {/* Desktop privacy / terms */}
          <div className="hidden flex-wrap justify-center gap-4 sm:flex">
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-[#9D9D9D] hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-[#9D9D9D] hover:text-black"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
