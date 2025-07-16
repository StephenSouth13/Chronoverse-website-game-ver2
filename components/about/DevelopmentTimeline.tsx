"use client"

import Image from "next/image"
import { mockDevelopmentHistory } from "@/lib/data"
import { useLanguage } from "@/lib/i18n"
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"

export default function DevelopmentTimeline() {
  const { lang } = useLanguage()

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto relative">
        {/* Vertical line for the timeline */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-nebula-purple h-full hidden md:block"></div>

        {mockDevelopmentHistory.map((milestone, index) => {
          const isEven = index % 2 === 0
          const title = lang === "vi" ? milestone.title : milestone.title_en
          const description = lang === "vi" ? milestone.description : milestone.description_en

          return (
            <div key={milestone.year} className="relative mb-12 md:mb-20">
              {/* Circle dot for the timeline */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-electric-blue border-2 border-metallic-gold z-10 hidden md:flex items-center justify-center">
                <span className="text-xs font-bold text-deep-space">{milestone.year.toString().slice(-2)}</span>
              </div>

              <ScrollAnimationWrapper
                delay={index * 0.1}
                className={`flex flex-col md:flex-row items-center ${isEven ? "md:justify-start" : "md:justify-end"}`}
                variants={{
                  hidden: { opacity: 0, x: isEven ? -100 : 100 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    isEven ? "md:pr-10 text-right" : "md:pl-10 text-left"
                  } flex flex-col items-center md:items-${isEven ? "end" : "start"}`}
                >
                  <GlassmorphismCard className="p-6 w-full max-w-md">
                    <h3 className="text-2xl font-heading text-metallic-gold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{milestone.year}</p>
                    {milestone.image && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={milestone.image || "/placeholder.svg"}
                          alt={title}
                          fill
                          style={{ objectFit: "cover" }}
                          className="brightness-90"
                        />
                      </div>
                    )}
                    <p className="text-foreground">{description}</p>
                  </GlassmorphismCard>
                </div>
              </ScrollAnimationWrapper>
            </div>
          )
        })}
      </div>
    </section>
  )
}
