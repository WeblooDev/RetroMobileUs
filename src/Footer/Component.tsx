import Link from 'next/link'
import { getGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import type { Footer as FooterType } from '@/payload-types'
import { Media } from '@/components/Media'
import { NewsletterSubscription } from '@/components/NewsletterSubscription'

const getCachedGlobal =
  (slug: Global, depth = 0) =>
  async () =>
    getGlobal('footer', depth)

export async function Footer() {
  const footerData = (await getCachedGlobal('footer' as unknown as Global, 1)()) as FooterType
  const linkGroups = footerData?.linkGroups || []

  return (
    <footer className="bg-[#121221] sm:bg-[#1a1a33] w-full">
      <div className="block sm:hidden w-full p-4 py-8">
        <NewsletterSubscription variant="mobile" />
      </div>
      <div className=" border-t border-[#9494c7] sm:border-t-0  p-4 pt-6 pb-6 md:p-8 lg:p-4 xl:p-8 ">
        <div className="flex mt-4 flex-col justify-center items-center gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-4 2xl:gap-6">
          <div className="flex flex-col items-center xl:items-start">
            <div className="w-[60%] sm:w-full md:w-fit flex justify-center items-center p-2 mb-2">
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
              <div className="w-full xl:w-[80%] p-2 md:w-fit flex items-center justify-between  gap-6 lg:gap-8 xl:gap-10">
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
                      alt={`Footer Icon ${index}`}
                      className="flex gap-6 w-[23px] h-[23px] transition-transform justify-center items-center  duration-200 hover:scale-105"
                      imgClassName="h-auto w-auto w-[23px] h-[23px] transition-transform duration-200 hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 w-full xl:w-[65%] gap-4 md:gap-6 lg:gap-8 xl:gap-6 px-4 md:px-0">
            {linkGroups.map((group, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center 
                lg:items-start lg:justify-start lg:text-left 
                space-y-1 md:space-y-2 lg:space-y-3"
              >
                <p className="font-inter w-full  text-lg md:text-[20px] ultrawide:text-3xl font-medium pb-[2px] md:pb-1">
                  {group.title}
                </p>
                <div className="w-full h-fit flex justify-center items-center pb-4">
                  <div className="w-full sm:w-[80%] max-w-[380px] lg:max-w-full md:w-full border-b border-[#336]"></div>
                </div>
                <ul className="space-y-1 md:space-y-2">
                  {group.links?.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink
                        className="text-[#9494c7] font-semibold text-[16px] ultrawide:text-xl hover:underline hover:text-white font-inter"
                        {...link}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="hidden sm:block w-full">
              <NewsletterSubscription
                variant="desktop"
                className="flex flex-col items-center text-center space-y-1 md:space-y-2 lg:space-y-3 justify-center lg:text-left lg:items-start"
              />
            </div>
            <div className="flex sm:hidden justify-between flex-col items-center font-inter text-center gap-2 text-[#9494c7]">
              <Link
                href="https://www.dupontregistry.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline lg:text-[16px] hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://www.dupontregistry.com/participation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline lg:text-[16px] hover:text-foreground"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="my-6 md:mt-20 mb-6 flex justify-center items-center">
          <div className="border-t border-[#336] h-px w-[80%] max-w-[380px] lg:max-w-full md:w-full"></div>
        </div>

        <div className="flex justify-between flex-col items-center font-inter text-center gap-2 md:flex-row md:gap-4">
          {footerData?.copyright && (
            <p className="text-sm  lg:text-[16px]  text-[#9494c7]">
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://www.dupontregistrygroup.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                DUPONT REGISTRY GROUP.
              </a>{' '}
              All Rights Reserved.
            </p>
          )}
          <div className="text-[#9494c7] hidden sm:flex  flex-wrap justify-center gap-4">
            <Link
              href="https://www.dupontregistry.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline lg:text-[16px] hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://www.dupontregistry.com/participation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline lg:text-[16px] hover:text-foreground"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
