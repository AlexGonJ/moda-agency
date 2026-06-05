'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/contact.module.scss'

// Carrega o Masonry apenas no cliente para evitar erros de SSR no build
const Masonry = dynamic(() => import('./Masonry'), {
  ssr: false
})

const items = [
  { id: "1", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80", height: 400, url: "#" },
  { id: "2", img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&q=80", height: 380, url: "#" },
  { id: "3", img: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=500&q=80", height: 480, url: "#" },
  { id: "4", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80", height: 320, url: "#" },
  { id: "5", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80", height: 450, url: "#" },
  { id: "6", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&q=80", height: 300, url: "#" },
  { id: "7", img: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=500&q=80", height: 520, url: "#" },
  { id: "8", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500&q=80", height: 380, url: "#" },
  { id: "9", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80", height: 580, url: "#" },
  { id: "10", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80", height: 460, url: "#" },
  { id: "11", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&q=80", height: 360, url: "#" },
  { id: "12", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80", height: 340, url: "#" },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const masonryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Parallax suave para o texto (desce um pouco)
      gsap.to(introRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Parallax suave para o masonry (sobe um pouco)
      gsap.to(masonryRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="contato" className={styles.contact}>
      <div className={styles.container}>
        <div ref={introRef} className={styles.introRow}>
          <div className={styles.header}>
            <p className={styles.label}>Contato</p>
            <h2 className={styles.title}>
              <span className={styles.line1}>Vamos</span>
              <span className={styles.line2}>Conversar</span>
            </h2>
          </div>

          <div className={styles.editorialAside}>
            <p className={styles.asideLead}>
              Tem um projeto de moda que precisa de estratégia criativa? Estamos prontos para transformar sua marca em referência.
            </p>
            
            <div className={styles.contactChannels}>
              <p>Email: <span>contato@modaagency.com</span></p>
              <p>Telefone: <span>+55 11 99999-8888</span></p>
              <p>Endereço: <span>Jardins, São Paulo — SP</span></p>
            </div>

            <div className={styles.asideMeta}>
              <span>São Paulo / Brasil</span>
              <span>Propostas Abertas</span>
            </div>
          </div>
        </div>

        <div ref={masonryRef} className={styles.masonryWrapper}>
          <div className={styles.masonryBackdrop} aria-hidden="true">
            <div className={styles.depthLayer} />
          </div>

          <div className={styles.masonryContent}>
            <div className={styles.moodboardLabel}>Nosso Universo</div>
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.7}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={1.05}
              blurToFocus
            />
          </div>
        </div>
      </div>
    </section>
  )
}
