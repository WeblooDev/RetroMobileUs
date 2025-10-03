"use client"

type SimpleHeadingProps = {
  title: string
  backgroundColor?: string
}

export default function SimpleHeading({
  title,
  backgroundColor = "#8B9B5C",
}: SimpleHeadingProps) {
  return (
    <section
      className="flex justify-start items-start my-4"         
 
    >
      <h3 className="text-white text-xl md:text-6xl bg-[#8B9B5C] py-8 px-12">{title}</h3>
    </section>
  )
}
