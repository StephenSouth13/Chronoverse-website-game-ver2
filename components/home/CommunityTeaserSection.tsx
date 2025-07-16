"use client"

import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"
import { useLanguage } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { DiscIcon as Discord } from "lucide-react"
import Link from "next/link"
import { useSoundEffect } from "@/hooks/use-sound-effect"

export default function CommunityTeaserSection() {
  const { t } = useLanguage()
  const playClickSound = useSoundEffect("/audio/button-click.mp3")

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto text-center">
        <ScrollAnimationWrapper>
          <h2 className="text-4xl md:text-5xl font-heading text-nebula-purple mb-6">{t("joinCommunityTitle")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {t("communityTeaserDescription")}
          </p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <GlassmorphismCard className="p-8 flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-heading text-electric-blue mb-6">{t("joinDiscord")}</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">{t("discordDescription")}</p>
            <Link href="/community#discord">
              <Button
                className="bg-electric-blue text-deep-space hover:bg-metallic-gold transition-all duration-300 px-8 py-3 text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-electric-blue/50 animate-glow flex items-center"
                onClick={playClickSound}
              >
                <Discord className="h-6 w-6 mr-2" /> {t("joinOurCommunity")}
              </Button>
            </Link>
          </GlassmorphismCard>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
