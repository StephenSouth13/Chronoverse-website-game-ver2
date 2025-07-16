"use client"

import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"
import { useLanguage } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useSoundEffect } from "@/hooks/use-sound-effect" // Import useSoundEffect

export default function GameTrailerSection() {
  const { t } = useLanguage()
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const playClickSound = useSoundEffect("/audio/button-click.mp3") // Initialize sound effect

  // Placeholder YouTube video ID (replace with your actual trailer ID)
  const youtubeVideoId = "dQw4w9WgXcQ" // Rick Astley - Never Gonna Give You Up (for demonstration)

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <ScrollAnimationWrapper>
        <h2 className="text-4xl md:text-5xl font-heading text-center text-electric-blue mb-12">{t("gameTrailer")}</h2>
      </ScrollAnimationWrapper>

      <div className="container mx-auto">
        <GlassmorphismCard className="p-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-full lg:w-2/3 aspect-video rounded-lg overflow-hidden shadow-xl group">
            <img
              src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
              alt="ChronoVerse Game Trailer Thumbnail"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-electric-blue transition-colors duration-300"
                onClick={() => {
                  setIsTrailerOpen(true)
                  playClickSound() // Add sound effect
                }}
                aria-label={t("watchTrailer")}
              >
                <PlayCircle className="h-20 w-20 fill-current" />
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h3 className="text-3xl font-heading text-metallic-gold mb-4">{t("watchTrailer")}</h3>
            <p className="text-lg text-muted-foreground mb-6">{t("trailerDescription")}</p>
            <Button
              onClick={() => {
                setIsTrailerOpen(true)
                playClickSound() // Add sound effect
              }}
              className="bg-burning-orange text-deep-space hover:bg-metallic-gold transition-all duration-300 px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-burning-orange/50"
            >
              <PlayCircle className="h-5 w-5 mr-2" /> {t("watchTrailer")}
            </Button>
          </div>
        </GlassmorphismCard>
      </div>

      <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
        <DialogContent className="max-w-4xl w-full p-0 border-none bg-transparent">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
              title="ChronoVerse Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
