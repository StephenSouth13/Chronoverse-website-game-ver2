"use client"

import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"
import { useLanguage } from "@/lib/i18n"
import { mockChapters } from "@/lib/data"
import * as LucideIcons from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSoundEffect } from "@/hooks/use-sound-effect"

export default function ChaptersTeaserSection() {
  const { lang, t } = useLanguage()
  const playClickSound = useSoundEffect("/audio/button-click.mp3")

  // Display only the first 3 chapters for the teaser
  const chaptersToDisplay = mockChapters.slice(0, 3)

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto text-center">
        <ScrollAnimationWrapper>
          <h2 className="text-4xl md:text-5xl font-heading text-electric-blue mb-6">{t("exploreChaptersTitle")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {t("chapterTeaserDescription")}
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {chaptersToDisplay.map((chapter, index) => {
            const IconComponent = LucideIcons[chapter.icon as keyof typeof LucideIcons]
            return (
              <ScrollAnimationWrapper key={chapter.id} delay={index * 0.1}>
                <GlassmorphismCard className="p-6 flex flex-col items-center text-center h-full hover:shadow-metallic-gold/30 hover:scale-105 transition-all duration-300">
                  {IconComponent && <IconComponent className="h-12 w-12 text-burning-orange mb-4" />}
                  <h3 className="text-2xl font-heading text-metallic-gold mb-2">
                    {lang === "vi" ? chapter.name : chapter.name_en}
                  </h3>
                  <p className="text-md text-muted-foreground flex-grow">
                    {lang === "vi" ? chapter.theme : chapter.theme_en}
                  </p>
                  <Link href={`/about#${chapter.id}`} className="mt-4">
                    <Button
                      variant="outline"
                      className="border-nebula-purple text-nebula-purple hover:bg-nebula-purple hover:text-white transition-colors duration-300 bg-transparent"
                      onClick={playClickSound}
                    >
                      {t("viewDetails")}
                    </Button>
                  </Link>
                </GlassmorphismCard>
              </ScrollAnimationWrapper>
            )
          })}
        </div>

        <ScrollAnimationWrapper delay={0.4}>
          <Link href="/about#chapters">
            <Button
              className="bg-nebula-purple text-deep-space hover:bg-electric-blue transition-all duration-300 px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-nebula-purple/50"
              onClick={playClickSound}
            >
              {t("viewAllChapters")}
            </Button>
          </Link>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
