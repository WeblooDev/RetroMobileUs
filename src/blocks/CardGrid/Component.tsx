"use client"

import { CTAButton } from "@/components/CTAButton" // if default export; else { CTAButton }
type CardItem = {
  image?: { url?: string }
  title: string
  description: string
  button?: { label: string; url: string }
  spanFullOnDesktop?: boolean
}

type CardGridProps = {
  columnsDesktop?: "1" | "2"
  cards?: CardItem[]
}

export default function CardGrid({ columnsDesktop = "2", cards = [] }: CardGridProps) {
  const gridCols =
    columnsDesktop === "1"
      ? "grid-cols-1"
      : "grid-cols-1 md:grid-cols-2"

  return (
    <section className="container sm:px-6  py-12 ">
      <div className={`grid ${gridCols} gap-10`}>
        {cards.map((card, i) => (
          <article
            key={i}
            className={card.spanFullOnDesktop ? "md:col-span-2" : ""}
          >
            {/* Image */}
            {card.image?.url && (
              <div className=" w-full overflow-hidden">
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="h-full w-full object-cover max-h-[364px]"
                  loading="lazy"
                />
              </div>
            )}

            {/* Text */}
            <div className="pt-5 text-center">
              <h3 className="font-ivar text-2xl md:text-3xl text-foreground mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-prose mx-auto leading-relaxed mb-5">
                {card.description}
              </p>

              {/* Button */}
              {card.button && (
                <CTAButton href={card.button.url} variant="black" aria-label={card.button.label} size="big">
                  {card.button.label}
                </CTAButton>
              )}
            </div>

          </article>
        ))}
      </div>
    </section>
  )
}
