'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SplitText from './SplitText'
import styles from '../styles/hero.module.scss'

interface HeroProps {
  start: boolean
}

export default function Hero({ start }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)

 useEffect(() => {
  let ctx: gsap.Context | undefined

  const move = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30
    const y = (e.clientY / window.innerHeight - 0.5) * 30

    gsap.to(imageRef.current, {
      x,
      y,
      duration: 1,
      ease: 'power3.out'
    })
  }

  ;(async () => {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: 120,
        scale: 1.15, // IMPORTANT: more scale to avoid white edges
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      gsap.to(textRef.current, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

      if (start) {
        gsap.fromTo(
          pRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.2,
          }
        )
      }
    }, sectionRef)

    window.addEventListener('mousemove', move)
  })()

  return () => {
    ctx?.revert()
    window.removeEventListener('mousemove', move)
  }
}, [start])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <img
        ref={imageRef}
        className={styles.heroBg}
        src="./heroi1.png"
        alt="Hero background"
      />

      <div className={styles.overlayNoise} />

      <div className={styles.content} ref={textRef}>
        <h1>
          <SplitText>
            Designing digital experiences with <br />
            clarity & purpose
          </SplitText>
        </h1>
          
        
        <p ref={pRef} style={{ opacity: 0 }}>
          Focused on crafting thoughtful interfaces and meaningful digital products.
        </p>
      </div>
    </section>
  )
}