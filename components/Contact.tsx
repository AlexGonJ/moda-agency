'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from '../styles/contact.module.scss'

// Carrega o Masonry apenas no cliente para evitar erros de SSR no build
const Masonry = dynamic(() => import('./Masonry'), {
  ssr: false
})

const items = [
  { id: "1", img: "/projects/next.png", height: 400, url: "#" },
  { id: "2", img: "/projects/via.png", height: 380, url: "#" },
  { id: "3", img: "/projects/bag.png", height: 600, url: "#" },
  { id: "4", img: "/projects/work1.png", height: 320, url: "#" },
  { id: "5", img: "/projects/post.png", height: 450, url: "#" },
  { id: "6", img: "/projects/localiza.png", height: 300, url: "#" },
  { id: "7", img: "/projects/mockup.jpeg", height: 520, url: "#" },
  { id: "8", img: "/projects/sport.png", height: 380, url: "#" },
  { id: "9", img: "/projects/golde.png", height: 800, url: "#" },
  { id: "10", img: "/projects/PlacaAline.png", height: 480, url: "#" },
  { id: "11", img: "/projects/.png", height: 360, url: "#" },
  { id: "12", img: "/projects/dental.png", height: 340, url: "#" },
]

export default function Contact() {
  const [parallaxY, setParallaxY] = useState(0)
  const parallaxStyle = { '--parallax-y': `${parallaxY}px` } as CSSProperties

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return

      frame = window.requestAnimationFrame(() => {
        setParallaxY(window.scrollY * 0.08)
        frame = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className={styles.contact} style={parallaxStyle}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Connect</p>
          <h2 className={styles.title}>
            <span className={styles.line1}>Get in</span>
            <span className={styles.line2}>touch</span>
          </h2>
        </div>

        <div className={styles.masonryWrapper}>
          <div className={styles.masonryBackdrop} aria-hidden="true">
            <div className={styles.depthLayer} />
            <div className={styles.womanIllustration} />
          </div>

          <div className={styles.masonryContent}>
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.7}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.97}
              blurToFocus
            />
          </div>
        </div>
      </div>
    </section>
  )
}
