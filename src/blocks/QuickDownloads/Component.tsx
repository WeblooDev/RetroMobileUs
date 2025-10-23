"use client"

import Link from "next/link"
import Image from "next/image"
import { useCallback } from "react"
import type { QuickDownloads as QuickDownloadsBlock } from "@/payload-types"
import { Media } from "@/components/Media"
import downloadIcon from "../../../public/download.svg"

const QuickDownloads: React.FC<QuickDownloadsBlock> = ({ title, items }) => {
  const rows = items ?? []

  const downloadFile = useCallback(async (url: string, suggestedName?: string) => {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = objectUrl
      a.download = suggestedName || url.split("/").pop() || "download"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(objectUrl)
    } catch (e) {
      console.error("Download failed:", e)
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }, [])

  return (
    <section className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-5xl leading-tight mb-20">{title}</h2>

      <div className="mt-6 md:mt-10 space-y-10 md:space-y-14">
        {rows.map((row, i) => {
          const fileObj = (row?.file && typeof row.file === "object" ? (row.file as any) : undefined)
          const fileUrl: string | undefined = fileObj?.url
          const externalUrl: string | undefined = row?.externalUrl || undefined
          const label = row?.linkLabel || "DOWNLOAD"
          const newTab = row?.newTab

          return (
            <div
              key={row?.id ?? i}
              className="flex justify-between items-center gap-6 md:gap-10 w-full"
            >
              <div className="flex items-center gap-6 md:gap-10 w-[70%]">
                <div className="w-[50%] relative aspect-[429/237] overflow-hidden rounded-md">
                  {row?.image && <Media resource={row.image} fill imgClassName="object-cover" />}
                </div>
                <div className="flex flex-col items-start justify-start w-[50%] gap-4">
                  {row?.subtitle && (
                    <h3 className="text-base md:text-xl tracking-wide uppercase">
                      {row.subtitle}
                    </h3>
                  )}
                  {row?.description && (
                    <p className="mt-2 text-sm md:text-base text-black max-w-prose">
                      {row.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-[30%] flex flex-col items-end justify-center">
                {fileUrl ? (
                  <button
                    type="button"
                    onClick={() => downloadFile(fileUrl, fileObj?.filename || undefined)}
                    className="!text-[22px] font-ivar inline-flex items-center gap-2 text-sm md:text-base underline underline-offset-[6px] hover:decoration-black transition"
                    aria-label={label}
                  >
                    {label}
                    <Image
                      src={downloadIcon}
                      alt=""
                      aria-hidden
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                  </button>
                ) : externalUrl ? (
                  <Link
                    href={externalUrl}
                    {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 text-sm md:text-base underline underline-offset-[6px] decoration-black/40 hover:decoration-black transition"
                    aria-label={label}
                  >
                    {label}
                    <Image
                      src={downloadIcon}
                      alt=""
                      aria-hidden
                      width={20}
                      height={20}
                      className="h-4 w-4"
                    />
                  </Link>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default QuickDownloads
