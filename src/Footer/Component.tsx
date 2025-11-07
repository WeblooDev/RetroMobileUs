import Link from 'next/link'
import { getGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'
import type { Footer as FooterType } from '@/payload-types'
import { Media } from '@/components/Media'

const getCachedGlobal =
  (slug: Global, depth = 0) =>
  async () =>
    getGlobal('footer', depth)

export async function Footer() {
  const footerData = (await getCachedGlobal('footer' as unknown as Global, 1)()) as FooterType
  const linkGroups = footerData?.linkGroups || []

  return (
    <footer className="p-6 w-full">
      <div className="container">
        <div className=" border-t  sm:border-t-0  ">
          <div className="flex mt-4 flex-col justify-center items-center gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-4 2xl:gap-6">
            <div className="flex flex-col items-center xl:items-start gap-4   min-h-auto lg:min-h-[250px] justify-between">
              <div className="w-[60%] sm:w-full md:w-fit flex justify-center items-center mb-2">
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
                        className="flex gap-6 w-[23px] h-[23px] justify-center items-center  "
                        imgClassName="h-auto w-auto w-[23px] h-[23px] "
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full xl:w-[60%] gap-12  md:gap-6 lg:gap-20 px-4 md:px-0">
              {linkGroups.map((group, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center 
                lg:items-start lg:justify-start lg:text-left gap-4
             "
                >
                  <h4 className=" text-sm uppercase  ">{group.title}</h4>
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
            <div className="flex sm:hidden justify-between flex-col items-center font-inter text-center gap-2 ">
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

        <div className="my-6 mb-6 flex justify-center items-center">
          <div className="border-t border-[#336] h-px w-[80%] max-w-[380px] lg:max-w-full md:w-full"></div>
        </div>

        <div className="flex justify-between flex-col items-center font-inter text-center gap-2 md:flex-row md:gap-4">
          {footerData?.copyright && (
            <p className="text-sm  text-[#9D9D9D] uppercase ">
              &copy; {new Date().getFullYear()}{' '}
              <Link
                href="https://www.dupontregistrygroup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
              >
                RETROMOBILE.
              </Link>{' '}
              All Rights Reserved.
            </p>
          )}
          <div className=" hidden sm:flex  flex-wrap justify-center gap-4">
            <Link
              href="https://www.dupontregistry.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline  text-[#9D9D9D] hover:text-black"
            >
              Privacy Policy
            </Link>
         
          </div>
        </div>
      </div>
    </footer>
  )
}
