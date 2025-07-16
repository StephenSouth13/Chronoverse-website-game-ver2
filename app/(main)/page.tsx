"use client"

import HeroSection from "@/components/home/HeroSection"
import KeyFeatures from "@/components/home/KeyFeatures"
import GallerySection from "@/components/home/GallerySection"
import GameTrailerSection from "@/components/home/GameTrailerSection"
import AboutChronoVerseSection from "@/components/home/AboutChronoVerseSection"
import ChaptersTeaserSection from "@/components/home/ChaptersTeaserSection"
import LatestNewsSection from "@/components/home/LatestNewsSection"
import CommunityTeaserSection from "@/components/home/CommunityTeaserSection"
import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import { useLanguage } from "@/lib/i18n"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden">
      <HeroSection />

      {/* About ChronoVerse Section */}
      <AboutChronoVerseSection />

      {/* Key Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <ScrollAnimationWrapper>
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading text-electric-blue mb-6">{t("slogan")}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t("chronoVerseDescription")}</p>
          </div>
        </ScrollAnimationWrapper>
        <KeyFeatures />
      </section>

      {/* Chapters Teaser Section */}
      <ChaptersTeaserSection />

      {/* Game Trailer Section */}
      <GameTrailerSection />

      {/* Latest News Section */}
      <LatestNewsSection />

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <GallerySection />
      </section>

      {/* Community Teaser Section */}
      <CommunityTeaserSection />
    </div>
  )
}
