'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ExhibitorActivities as ExhibitorActivitiesBlock } from '@/payload-types'
import Image from 'next/image'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const ExhibitorActivities: React.FC<ExhibitorActivitiesBlock> = ({ title, items }) => {
  const activities = Array.isArray(items) ? items : []

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          className="text-3xl md:text-6xl mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {activities.map((activity, i) => (
            <motion.article key={activity?.id ?? i} variants={staggerItem}>
              <div className="relative aspect-[388/393] w-full overflow-hidden mb-6">
                {activity?.image && (
                  <Media resource={activity.image} fill imgClassName="object-cover" />
                )}
              </div>

              <h3 className="text-lg md:text-xl font-semibold mb-4">{activity?.title}</h3>

              <ul className="space-y-2 text-sm md:text-base">
                {activity?.date && (
                  <li className="flex items-center gap-2">
                    <Image src="/calendar.svg" alt="" aria-hidden width={16} height={16} />
                    <span>{activity.date}</span>
                  </li>
                )}

                {activity?.time && (
                  <li className="flex items-center gap-2">
                    <Image src="/clock.svg" alt="" aria-hidden width={16} height={16} />
                    <span>{activity.time}</span>
                  </li>
                )}

                {activity?.event && (
                  <li className="flex items-center gap-2">
                    <Image src="/social.svg" alt="" aria-hidden width={16} height={16} />
                    <span>{activity.event}</span>
                  </li>
                )}

                {activity?.location && (
                  <li className="flex items-center gap-2">
                    <Image src="/location.svg" alt="" aria-hidden width={16} height={16} />
                    <span>{activity.location}</span>
                  </li>
                )}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ExhibitorActivities
