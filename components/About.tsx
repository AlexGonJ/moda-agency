'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/about.module.scss'
import ScrollReveal from './ScrollReveal'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Parallax na imagem lateral
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Linha decorativa que cresce ao scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" ref={sectionRef} className={styles.about}>
      {/* Coluna da imagem editorial */}
      <div className={styles.imageColumn}>
        <div className={styles.imageFrame}>
          <img
            ref={imageRef}
            src="/second.jpg"
            alt="Fashion editorial — Campanha de moda"
            className={styles.editorialImage}
          />
        </div>
        <span className={styles.imageCaption}>
          Campanha SS26 — Editorial Vogue
        </span>
      </div>

      {/* Linha decorativa central */}
      <div className={styles.dividerCol}>
        <div ref={lineRef} className={styles.dividerLine} />
      </div>

      {/* Coluna de texto editorial */}
      <div className={styles.textColumn}>
        <span className={styles.eyebrow}>Sobre a Agência</span>

        <div className={styles.quoteBlock}>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={8}
            containerClassName={styles.bigQuote}
          >
            Não criamos apenas campanhas — construímos universos visuais que transformam marcas em desejo.
          </ScrollReveal>
        </div>

        <div className={styles.bodyText}>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            blurStrength={4}
            containerClassName={styles.bodyP}
          >
            Somos uma agência de marketing especializada no universo da moda. Da estratégia ao conteúdo final, nosso trabalho conecta visão criativa com resultado — transformando marcas em referências culturais.
          </ScrollReveal>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Marcas atendidas</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>12</span>
            <span className={styles.statLabel}>Anos de mercado</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Continentes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
