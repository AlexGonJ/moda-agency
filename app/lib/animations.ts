'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeUp = (el: HTMLElement, delay = 0) => {
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

export const revealProject = (el: HTMLElement) => {
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
export const parallaxImage = (el: HTMLElement) => {
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