'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaCarouselType } from 'embla-carousel'

type Testimonial = {
  id: string
  name: string
  text: string
  date?: string
  location?: string
  rating: number
  profilePic?: { url: string }
}

type TestimonialCarouselProps = {
  backgroundImage: { url: string }
  title: string
}
const TestimonialCarouselBlock: React.FC<TestimonialCarouselProps> = ({
  backgroundImage,
  title,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const plugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: true }))
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)
  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  useEffect(() => {
    if (!emblaApi) return
    const updateIndex = () => {
      const index = emblaApi.selectedScrollSnap()
      setCurrentIndex(index)
    }
    emblaApi.on('select', updateIndex)
    updateIndex()
    return () => {
      emblaApi.off('select', updateIndex)
    }
  }, [emblaApi])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/custom-reviews')
        const { docs } = await res.json()
        setTestimonials(docs)
      } catch (err) {
        console.error('Failed to fetch testimonials:', err)
      }
    }
    fetchReviews()
  }, [])

  const getTestimonials = () => {
    let total = 0
    testimonials.forEach((item) => (total += item?.rating))
    return total / testimonials.length
  }

  if (testimonials?.length === 0) {
    return (
      <div className="relative w-full py-20 text-center text-white bg-black/60">
        <Image
          src={backgroundImage?.url}
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-xl">Loading reviews...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden h-full min-h-screen">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-black/50">
          <Image
            src={backgroundImage?.url}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 px-4 py-20 md:py-20 max-w-full sm:max-w-[90%] mx-auto">
        <div className="flex justify-center items-center">
          <Carousel
            setApi={(api) => {
              if (api) {
                setEmblaApi(api)
              }
            }}
            plugins={[plugin.current]}
            opts={{
              align: 'center',
              loop: true,
              skipSnaps: false,
              // dragFree: true,
              containScroll: 'trimSnaps',
            }}
            className="w-full gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 ultrawide:gap-16"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-8">
              <div className="text-white">
                <h2 className="font-ivar text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4">
                  {title}
                </h2>
                {/* <p className="font-ivar font-light text-2xl lg:text-4xl xl:text-6xl">
                  {testimonials?.length} Reviews | {getTestimonials()}
                </p> */}
              </div>
              <div className="flex w-full justify-end items-center mt-4 md:mt-0">
                <span className="font-inter text-white mr-4">
                  {String(currentIndex + 1).padStart(2, '0')}/
                  {String(testimonials?.length).padStart(2, '0')}
                </span>
                <div className="flex space-x-2">
                  {/* Prev Button — Right to Left */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPrev}
                    className="relative overflow-hidden px-10 py-5 border border-white text-white bg-transparent hover:bg-transparent group group-hover:border-black transition-colors duration-500"
                  >
                    <span className="absolute inset-0 bg-black transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0 z-0" />
                    <span className="relative z-10 flex justify-center items-center gap-3 text-white font-inter">
                      <ArrowLeft className="h-5 w-5" />
                      Prev
                    </span>
                  </Button>

                  {/* Next Button — Left to Right */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollNext}
                    className="relative overflow-hidden px-10 py-5 border border-white text-white bg-transparent hover:bg-transparent group group-hover:border-black transition-colors duration-500"
                  >
                    <span className="absolute inset-0 bg-black transition-transform duration-500 ease-out transform -translate-x-full group-hover:translate-x-0 z-0" />
                    <span className="relative z-10 flex justify-center items-center gap-3 text-white font-inter">
                      Next
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <CarouselContent className="snap-start -ml-2 md:-ml-4">
              {testimonials?.map((testimonial) => (
                <CarouselItem
                  key={testimonial?.id}
                  className="flex justify-center items-center pl-2 md:pl-4 basis-[100%] sm:basis-[100%] md:basis-[100%] lg:basis-[100%] min-w-[280px] sm:min-w-[320px] md:min-w-[380px]"
                >
                  <Card className="max-w-2xl bg-white shadow-lg border-none rounded-none">
                    <CardContent className="p-8 flex flex-col justify-between min-h-[22rem] border-none">
                      <p className="font-inter text-black font-light text-base md:text-xl mb-8">
                        {testimonial?.text}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                            {testimonial?.profilePic && (
                              <Image
                                src={testimonial?.profilePic?.url}
                                alt={testimonial?.name}
                                fill
                                className="object-cover "
                              />
                            )}
                          </div>
                          <div>
                            <h2 className="font-ivar font-medium text-base md:text-2xl text-black">
                              {testimonial?.name}
                            </h2>
                            {testimonial?.location && (
                              <p className="font-ivar  text-black">{testimonial?.location}</p>
                            )}
                            {testimonial?.date && (
                              <p className="font-inter text-black text-sm md:text-base ">
                                {testimonial?.date}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* <div className="flex font-inter items-center text-black">
                          <span className="mr-1 text-lg md:text-2xl">Review</span>
                          <span className="text-lg md:text-2xl">
                            {testimonial?.rating?.toFixed(1)}
                          </span>
                        </div> */}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarouselBlock
