"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import type { Engine } from "tsparticles"

export default function ParticleBackground() {
  const particlesInit = useCallback((_engine: Engine) => {
    /* No extra plugins needed – the default engine already supports
       everything our current config uses. Removing loadFull avoids
       the v3/v2 version mismatch that caused `checkVersion` errors. */
  }, [])

  const particlesLoaded = useCallback(async (container: any) => {
    console.log("Particles container loaded", container)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Ensure it's behind other content
        },
        particles: {
          number: {
            value: 150, // Tăng số lượng hạt để dày đặc hơn
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: ["#00F0FF", "#A020F0", "#FFD700", "#FF4500", "#ffffff"], // electric-blue, nebula-purple, metallic-gold, burning-orange, white
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: 0.7, // Tăng độ mờ để hạt rõ hơn
            random: true, // Thêm ngẫu nhiên độ mờ
            anim: {
              enable: true, // Bật animation cho opacity
              speed: 0.8, // Tốc độ nhấp nháy nhẹ
              opacity_min: 0.2,
              sync: false,
            },
          },
          size: {
            value: 2.5, // Giảm kích thước hạt một chút
            random: true,
            anim: {
              enable: true, // Bật animation cho size
              speed: 20, // Tốc độ thay đổi kích thước
              size_min: 0.5,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 120, // Giảm khoảng cách liên kết để tạo mạng lưới dày hơn
            color: "#ffffff",
            opacity: 0.3, // Giảm độ mờ của đường liên kết
            width: 1,
          },
          move: {
            enable: true,
            speed: 2, // Giảm tốc độ di chuyển để tạo cảm giác trôi nổi
            direction: "none",
            random: true, // Thêm ngẫu nhiên hướng di chuyển
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              links: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      }}
    />
  )
}
