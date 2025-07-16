"use client"

import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"
import { useLanguage } from "@/lib/i18n"
import Image from "next/image"

export default function AboutChronoVerseSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <ScrollAnimationWrapper>
          <h2 className="text-4xl md:text-5xl font-heading text-center text-metallic-gold mb-12">
            {t("aboutChronoVerseTitle")}
          </h2>
        </ScrollAnimationWrapper>

        <GlassmorphismCard className="p-8 flex flex-col lg:flex-row items-center gap-8">
          <ScrollAnimationWrapper delay={0.2} className="w-full lg:w-1/2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=540&width=960" // Placeholder image for About section
                alt="ChronoVerse Game Overview"
                fill
                style={{ objectFit: "cover" }}
                className="brightness-75"
              />
            </div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper delay={0.3} className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("aboutChronoVerseDescription")}
            </p>
          </ScrollAnimationWrapper>
        </GlassmorphismCard>
      </div>
    </section>
  )
}
