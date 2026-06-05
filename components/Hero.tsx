'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from './SplitText'
import styles from '../styles/hero.module.scss'

interface HeroProps {
  start: boolean
}

export default function Hero({ start }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let ctx: gsap.Context | undefined
    let moveHandler: ((e: MouseEvent) => void) | undefined

    if (imageRef.current) {
      const xTo = gsap.quickTo(imageRef.current, 'x', { duration: 1.2, ease: 'power3.out' })
      const yTo = gsap.quickTo(imageRef.current, 'y', { duration: 1.2, ease: 'power3.out' })

      moveHandler = (e: MouseEvent) => {
        if (window.scrollY > window.innerHeight) return
        const x = (e.clientX / window.innerWidth - 0.5) * 15
        const y = (e.clientY / window.innerHeight - 0.5) * 15
        xTo(x)
        yTo(y)
      }

      window.addEventListener('mousemove', moveHandler)
    }

    ctx = gsap.context(() => {
      // Parallax na imagem de fundo
      gsap.to(imageRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Parallax para o texto
      gsap.to(textRef.current, {
        y: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      if (start) {
        gsap.fromTo(
          pRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 0.9, duration: 1.2, ease: 'power3.out', delay: 1.1 }
        )

        gsap.fromTo(
          ctaRef.current,
          { y: 24, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 1.3 }
        )
      }
    }, sectionRef)

    return () => {
      ctx?.revert()
      if (moveHandler) {
        window.removeEventListener('mousemove', moveHandler)
      }
    }
  }, [start])

  return (
    <section ref={sectionRef} className={styles.hero}>
      <img
        ref={imageRef}
        className={styles.heroBg}
        src="/hero2.jpg"
        alt="Fashion editorial — Agência de Marketing de Moda"
      />

      <div className={styles.overlayGradient} />

      <div className={styles.content} ref={textRef}>
        <span className={styles.eyebrow}>Fashion Marketing Agency</span>
        <h1>
          <SplitText animate={start}>
            Construímos marcas que a moda não esquece
          </SplitText>
        </h1>

        <p ref={pRef} style={{ opacity: 0 }}>
          Estratégia, branding e conteúdo para marcas de moda que querem dominar o mercado e criar conexões reais com seu público.
        </p>

        <div className={styles.actions}>
          <a ref={ctaRef} href="#projetos" className={styles.cta}>
            <span>Ver Cases</span>
            <svg className={styles.ctaArrow} viewBox="0 0 24 24">
              <path d="M7 17 17 7M8.5 7H17v8.5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
