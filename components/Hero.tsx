'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import SplitText from './SplitText'
import styles from '../styles/hero.module.scss'

interface HeroProps {
  start: boolean;
}

export default function Hero({ start }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // --- EFEITO 1: PARALLAX NO SCROLL ---
      const tlParallax = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      })

      tlParallax.to(imageRef.current, { y: "15%", ease: "none" }, 0)
      tlParallax.to(textRef.current, { y: "-150px", ease: "none" }, 0)

      // --- EFEITO 2: ANIMAÇÃO DE ENTRADA (DEPENDENTE DO LOADER) ---
      if (start) {
        const tlIn = gsap.timeline()
        
        // Garante que o texto comece invisível e suba
        tlIn.fromTo([h1Ref.current, pRef.current], 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            stagger: 0.2, 
            ease: "power4.out",
            delay: 0.3 // Espera o loader sair da frente
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [start]) // Re-executa quando o Loader der o OK

  return (
    <section ref={sectionRef} className={styles.hero}>
      <img
        ref={imageRef}
        className={styles.heroBg}
        src="./hero.jpg"
        alt="Hero background"
      />

      <div className={styles.content} ref={textRef}>
        <h1 ref={h1Ref} style={{ opacity: 0 }}> {/* Começa oculto */}
          <SplitText>
            Designing digital experiences with <br />clarity & purpose
          </SplitText>
        </h1>
        <p ref={pRef} style={{ opacity: 0 }}> {/* Começa oculto */}
          Focused on crafting thoughtful interfaces and meaningful digital products.
        </p>
      </div>
    </section>
  )
}