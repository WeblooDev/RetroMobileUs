"use client"

type CardItem = {
  image?: { url?: string }
  title: string
  description: string
  url?: string
}

type ExpectCardsProps = {
  title: string
  cards?: CardItem[]
}

export default function ExpectCards({ title, cards = [] }: ExpectCardsProps) {
  return (
    <section className="container py-12">
      {/* Title */}
      <h2 className=" text-6xl mb-8">
        {title}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {cards.map((card, i) => {
          const Inner = (
            <div className="relative group h-[320px] md:h-[476px] w-full ">
              {/* Image */}
              {card.image?.url ? (
                <img
                  src={card.image.url}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover "
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-muted" />
              )}

              {/* Gradient overlay */}

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0  text-white p-8 flex flex-col gap-2">
                <h3 className=" text-xl md:text-3xl ">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs md:text-base text-white/90 ">
                  {card.description}
                </p>
              </div>
            </div>
          )

          return card.url ? (
            <a
              key={i}
              href={card.url}
              className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/40"
            >
              {Inner}
            </a>
          ) : (
            <div key={i}>{Inner}</div>
          )
        })}
      </div>
    </section>
  )
}
