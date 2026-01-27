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

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          // Parallax apenas para Desktop/Tablet para evitar bugs de viewport no mobile
          gsap.to(imageRef.current, {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            }
          })
        });

        if (start) {
          gsap.fromTo(
            [h1Ref.current, pRef.current],
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.5,
            }
          )
        }
      }, sectionRef)
    })()

    return () => ctx?.revert()
  }, [start])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <img
        ref={imageRef}
        className={styles.heroBg}
        src="./hero.jpg"
        alt="Hero background"
      />

      <div className={styles.content} ref={textRef}>
        <h1 ref={h1Ref} style={{ opacity: 0 }}>
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