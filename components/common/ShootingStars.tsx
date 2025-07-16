"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import type { Engine } from "tsparticles"

export default function ShootingStars() {
  const particlesInit = useCallback((_engine: Engine) => {
    /* No plugins required – removing loadFull prevents the
       `checkVersion` error resulting from mixed package versions. */
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Shooting stars container loaded", container)
  }, [])

  return (
    <Particles
      id="shooting-stars-particles" // Unique ID for this canvas
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 1, // Ensure it's above the main ParticleBackground but below content (which is z-10)
        },
        particles: {
          number: {
            value: 10, // Tăng số lượng sao băng một chút
            density: {
              enable: true,
              value_area: 1500, // Điều chỉnh khu vực để sao băng xuất hiện
            },
          },
          color: {
            value: ["#00F0FF", "#FFD700", "#A020F0", "#ffffff"], // Electric blue, metallic gold, nebula purple, white
          },
          shape: {
            type: "star", // Use star shape for shooting stars
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 1,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 8, // Tăng kích thước sao băng
            random: true,
            anim: {
              enable: true,
              speed: 15, // Tốc độ thay đổi kích thước
              size_min: 0.5,
              sync: false,
            },
          },
          links: {
            enable: false, // No links for shooting stars
          },
          move: {
            enable: true,
            speed: 20, // Tăng tốc độ di chuyển
            direction: "bottom-left", // Hướng của sao băng
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
            trail: {
              enable: true,
              length: 15, // Kéo dài vệt sao băng
              fill: {
                color: "#ffffff", // Màu vệt sao băng
              },
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false, // No hover interaction
            },
            onclick: {
              enable: false, // No click interaction
            },
            resize: true,
          },
        },
        retina_detect: true,
      }}
    />
  )
}
