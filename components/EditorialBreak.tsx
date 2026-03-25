'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../styles/editorial-break.module.scss'

export default function EditorialBreak() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context | undefined

    ;(async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        if (!trackRef.current) return

        gsap.fromTo(
          trackRef.current,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      }, sectionRef)
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.breakSection}>
      <p className={styles.label}>Transition</p>
      <div ref={trackRef} className={styles.track}>
        <span>SPACED</span>
        <span>MOTION</span>
        <span>EDITORIAL</span>
      </div>
      <div className={styles.statement}>
        <p>Quiet spacing.</p>
        <p>Sharper rhythm.</p>
      </div>
      <p className={styles.support}>
        Um respiro tipografico para limpar o olhar antes do bloco final.
      </p>
    </section>
  )
}
