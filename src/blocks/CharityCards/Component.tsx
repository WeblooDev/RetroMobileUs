"use client"

type Card = {
  title: string
  description: string
}

type CharityCardsProps = {
  title: string
  backgroundImage?: { url?: string }
  cards: Card[]
}

export default function CharityCards({ title, backgroundImage, cards }: CharityCardsProps) {
  return (
    <section className="container relative w-full py-14">
      {/* Title */}
      <h2 className="text-6xl font-ivar mb-10  ">{title}</h2>

      {/* Background */}
      <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
        {backgroundImage?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage.url})` }}
          >
            <div className="absolute inset-0 bg-black/40" /> {/* overlay */}
          </div>
        )}

        {/* Cards */}
        <div className="relative z-10 flex gap-6 px-6 max-w-6xl w-full justify-center">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex-1 bg-white/10 border border-white  text-center text-white p-8 backdrop-blur-sm"
            >
              <h3 className="font-ivar text-2xl mb-2">{card.title}</h3>
              <p className="text-xl ">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
