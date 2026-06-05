'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/editorial-break.module.scss'

export default function EditorialBreak() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
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

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.breakSection}>
      <p className={styles.label}>O que fazemos</p>
      <div ref={trackRef} className={styles.track}>
        <span>ESTRATÉGIA</span>
        <span>BRANDING</span>
        <span>CONTEÚDO</span>
      </div>
      <div className={styles.statement}>
        <p>Criatividade com propósito.</p>
        <p>Resultados que impactam.</p>
      </div>
      <p className={styles.support}>
        Do conceito à execução, cada projeto é uma oportunidade de redefinir a presença de marca no mercado de moda.
      </p>
    </section>
  )
}
