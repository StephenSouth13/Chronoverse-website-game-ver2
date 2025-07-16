"use client"

import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import { useLanguage } from "@/lib/i18n"
import { mockNews } from "@/lib/data"
import NewsCard from "@/components/news/NewsCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSoundEffect } from "@/hooks/use-sound-effect"

export default function LatestNewsSection() {
  const { t } = useLanguage()
  const playClickSound = useSoundEffect("/audio/button-click.mp3")

  // Display the latest 2 news articles
  const latestNews = mockNews.slice(0, 2)

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto text-center">
        <ScrollAnimationWrapper>
          <h2 className="text-4xl md:text-5xl font-heading text-burning-orange mb-6">{t("latestNewsTitle")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            {t("newsTeaserDescription")}
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {latestNews.map((article, index) => (
            <ScrollAnimationWrapper key={article.slug} delay={index * 0.1}>
              <NewsCard article={article} />
            </ScrollAnimationWrapper>
          ))}
        </div>

        <ScrollAnimationWrapper delay={0.3}>
          <Link href="/news">
            <Button
              className="bg-burning-orange text-deep-space hover:bg-metallic-gold transition-all duration-300 px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-burning-orange/50"
              onClick={playClickSound}
            >
              {t("viewAllNews")}
            </Button>
          </Link>
        </ScrollAnimationWrapper>
      </div>
    </section>
  )
}
