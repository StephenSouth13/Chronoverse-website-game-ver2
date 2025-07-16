"use client"

import ScrollAnimationWrapper from "@/components/common/ScrollAnimationWrapper"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"
import { useLanguage } from "@/lib/i18n"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { mockFAQs } from "@/lib/data"
import Image from "next/image"
import { useSoundEffect } from "@/hooks/use-sound-effect"

export default function FAQPage() {
  const { lang, t } = useLanguage()
  const playClickSound = useSoundEffect("/audio/button-click.mp3")

  return (
    <div className="min-h-screen bg-deep-space text-foreground pt-24 pb-12 px-4 md:px-8 lg:px-16">
      <ScrollAnimationWrapper>
        <h1 className="text-5xl md:text-6xl font-heading text-center text-electric-blue mb-12">{t("faq")}</h1>
      </ScrollAnimationWrapper>

      {/* FAQ Banner */}
      <ScrollAnimationWrapper delay={0.2}>
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-16 shadow-xl">
          <Image
            src="/placeholder.svg?height=450&width=800" // Placeholder banner image for FAQ
            alt="Frequently Asked Questions Banner"
            fill
            style={{ objectFit: "cover" }}
            className="brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-space to-transparent flex items-end justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-heading text-white text-shadow-lg">{t("faq")}</h2>
          </div>
        </div>
      </ScrollAnimationWrapper>

      {/* FAQ Content */}
      <section id="faq-content" className="mb-16">
        <ScrollAnimationWrapper delay={0.3}>
          <GlassmorphismCard className="p-8">
            <h2 className="text-3xl md:text-4xl font-heading text-metallic-gold mb-6">{t("faq")}</h2>
            <Accordion type="single" collapsible className="w-full">
              {mockFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-glass-border">
                  <AccordionTrigger
                    className="text-lg font-semibold text-nebula-purple hover:text-electric-blue transition-colors duration-300"
                    onClick={playClickSound}
                  >
                    {lang === "vi" ? faq.question : faq.question_en}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base py-4">
                    {lang === "vi" ? faq.answer : faq.answer_en}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassmorphismCard>
        </ScrollAnimationWrapper>
      </section>
    </div>
  )
}
