'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let lenis: Lenis | null = null
    let rafId: number

    const init = async () => {
      const gsapModule = await import('gsap')
      const scrollTriggerModule = await import('gsap/ScrollTrigger')

      const gsap = gsapModule.default
      const ScrollTrigger = scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      })

      function raf(time: number) {
        lenis?.raf(time)
        ScrollTrigger.update()
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)

      // integra Lenis + ScrollTrigger
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && lenis) {
            lenis.scrollTo(value!)
          }
          return window.scrollY
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
      })

      ScrollTrigger.refresh()
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
