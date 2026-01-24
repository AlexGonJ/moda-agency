'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      gsap.ticker.tick()
      requestAnimationFrame(raf)
    }

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return <>{children}</>
}
