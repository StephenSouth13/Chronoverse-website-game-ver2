"use client"

import type React from "react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { toast } from "@/hooks/use-toast"
import GlassmorphismCard from "@/components/common/GlassmorphismCard"
import { useSoundEffect } from "@/hooks/use-sound-effect"

export default function SuggestionForm() {
  const { t } = useLanguage()
  const [suggestionText, setSuggestionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const playClickSound = useSoundEffect("/audio/button-click.mp3")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (suggestionText.trim() === "") return

    playClickSound()
    setIsSubmitting(true)

    // Simulate API call for submitting suggestion
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Suggestion submitted:", suggestionText)

    toast({
      title: t("suggestionSuccessTitle"),
      description: t("suggestionSuccessDescription"),
      variant: "default",
    })

    setSuggestionText("")
    setIsSubmitting(false)
  }

  return (
    <GlassmorphismCard className="p-8">
      <h2 className="text-3xl font-heading text-burning-orange mb-6">{t("sendUsSuggestion")}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="suggestion" className="block text-sm font-medium text-muted-foreground mb-2">
            {t("yourSuggestion")}
          </label>
          <Textarea
            id="suggestion"
            name="suggestion"
            value={suggestionText}
            onChange={(e) => setSuggestionText(e.target.value)}
            required
            rows={6}
            className="glassmorphism border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-electric-blue focus:border-electric-blue"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-burning-orange text-deep-space hover:bg-metallic-gold transition-all duration-300 px-8 py-3 text-lg font-bold rounded-full shadow-lg hover:shadow-burning-orange/50 flex items-center justify-center"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("submitSuggestionButton")}
        </Button>
      </form>
    </GlassmorphismCard>
  )
}
