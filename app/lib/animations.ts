'use client'

let gsapInstance: any = null
let ScrollTriggerInstance: any = null

const loadGSAP = async () => {
  if (typeof window === 'undefined') return null

  if (!gsapInstance || !ScrollTriggerInstance) {
    const gsapModule = await import('gsap')
    const scrollTriggerModule = await import('gsap/ScrollTrigger')

    gsapInstance = gsapModule.default
    ScrollTriggerInstance = scrollTriggerModule.default

    gsapInstance.registerPlugin(ScrollTriggerInstance)
  }

  return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance }
}

export const fadeUp = async (el: HTMLElement, delay = 0) => {
  const ctx = await loadGSAP()
  if (!ctx) return

  const { gsap } = ctx

  gsap.fromTo(
    el,
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    }
  )
}

export const revealProject = async (el: HTMLElement) => {
  const ctx = await loadGSAP()
  if (!ctx) return

  const { gsap } = ctx

  const image = el.querySelector('img')
  const meta = el.querySelector('[data-meta]')

  if (!image || !meta) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
    },
  })

  tl.fromTo(
    image,
    {
      y: 120,
      scale: 1.1,
      clipPath: 'inset(100% 0% 0% 0%)',
    },
    {
      y: 0,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power4.out',
    }
  )

  tl.fromTo(
    meta,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    },
    '-=0.6'
  )
}

export const parallaxImage = async (el: HTMLElement) => {
  const ctx = await loadGSAP()
  if (!ctx) return

  const { gsap } = ctx

  gsap.fromTo(
    el,
    { y: 0 },
    {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}
