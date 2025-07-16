"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5) // Default volume
  const [isMuted, setIsMuted] = useState(false)

  // Function to handle initial user interaction to enable playback
  const handleUserInteraction = useCallback(() => {
    if (audioRef.current && audioRef.current.paused && audioRef.current.readyState >= 2 /* HAVE_CURRENT_DATA */) {
      audioRef.current.play().catch((e) => console.error("Autoplay prevented:", e))
      setIsPlaying(true)
    }
    // Remove event listeners after first interaction
    document.removeEventListener("click", handleUserInteraction)
    document.removeEventListener("keydown", handleUserInteraction)
  }, [])

  useEffect(() => {
    const audioEl = document.createElement("audio")

    /* Check MP3 support before doing anything else */
    const canPlayMp3 = audioEl.canPlayType("audio/mpeg") !== ""
    if (!canPlayMp3) {
      console.warn("This environment cannot play MP3. AudioPlayer will stay disabled.")
      return
    }

    /* MP3 supported – continue normal setup */
    audioEl.src = "/audio/cosmic-ambience.mp3"
    audioEl.loop = true
    audioEl.volume = volume
    audioEl.muted = isMuted
    audioEl.preload = "auto"
    audioEl.crossOrigin = "anonymous"

    audioRef.current = audioEl

    // Add event listeners for initial user interaction
    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    const handleEnded = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audioRef.current.addEventListener("ended", handleEnded)
    audioRef.current.addEventListener("play", handlePlay)
    audioRef.current.addEventListener("pause", handlePause)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded)
        audioRef.current.removeEventListener("play", handlePlay)
        audioRef.current.removeEventListener("pause", handlePause)
        audioRef.current.pause()
        audioRef.current = null
      }
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [handleUserInteraction, volume, isMuted])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        if (audioRef.current.readyState >= 2 /* HAVE_CURRENT_DATA */) {
          audioRef.current.play().catch((e) => console.error("Playback error:", e))
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const newVol = newVolume[0] / 100
    setVolume(newVol)
    if (audioRef.current) {
      audioRef.current.volume = newVol
      if (newVol > 0 && isMuted) {
        setIsMuted(false)
        audioRef.current.muted = false
      } else if (newVol === 0 && !isMuted) {
        setIsMuted(true)
        audioRef.current.muted = true
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      if (!isMuted) {
        // If was unmuted, now muting, set volume to 0
        setVolume(0)
      } else {
        // If was muted, now unmuting, set volume to a default if it was 0
        setVolume(0.5)
      }
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 glassmorphism p-2 rounded-full shadow-lg border border-glass-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlayPause}
        className="text-electric-blue hover:text-metallic-gold transition-colors duration-300"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="text-electric-blue hover:text-metallic-gold transition-colors duration-300"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
      <Slider
        defaultValue={[volume * 100]}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
        className="w-24 [&>span:first-child]:h-2 [&>span:first-child]:bg-nebula-purple [&>span:first-child]:rounded-full [&>span:first-child>span]:bg-electric-blue [&>span:first-child>span]:rounded-full [&>span:first-child>span]:w-4 [&>span:first-child>span]:h-4 [&>span:first-child>span]:-mt-1 [&>span:first-child>span]:border-2 [&>span:first-child>span]:border-metallic-gold"
        aria-label="Volume control"
      />
    </div>
  )
}
