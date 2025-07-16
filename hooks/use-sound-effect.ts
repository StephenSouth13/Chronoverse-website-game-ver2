"use client"

import { useCallback, useEffect, useRef } from "react"

export function useSoundEffect(src: string, volume = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      const audio = new Audio(src)

      /* ✅ Kiểm tra trình duyệt / runtime có hỗ trợ định dạng MP3 không */
      const canPlay = audio.canPlayType("audio/mpeg") !== ""

      if (!canPlay) {
        console.warn(`Audio format for "${src}" is not supported in this environment.`)
        return () => {}
      }

      audio.volume = volume
      audioRef.current = audio

      /* Optional: preload meta để giảm độ trễ phát */
      audio.preload = "auto"
    } catch (err) {
      console.warn(`Sound source "${src}" cannot be initialized. Skipping sound effect.`)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, volume])

  const playSound = useCallback(() => {
    /* Chỉ phát khi audioRef tồn tại và đã sẵn sàng */
    if (audioRef.current && audioRef.current.readyState >= 2 /* HAVE_CURRENT_DATA */) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.error("Sound effect playback error:", e.message ?? e))
    }
  }, [])

  return playSound
}
