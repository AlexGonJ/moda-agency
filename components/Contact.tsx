'use client'

import dynamic from 'next/dynamic'
import styles from '../styles/contact.module.scss'

// Carrega o Masonry apenas no cliente para evitar erros de SSR no build
const Masonry = dynamic(() => import('./Masonry'), { 
  ssr: false 
})

const items = [
  { id: "1", img: "https://picsum.photos/id/10/600/900?grayscale", height: 400, url: "#" },
  { id: "2", img: "https://picsum.photos/id/11/600/750?grayscale", height: 280, url: "#" },
  { id: "3", img: "https://picsum.photos/id/12/600/800?grayscale", height: 500, url: "#" },
  { id: "4", img: "https://picsum.photos/id/13/600/700?grayscale", height: 320, url: "#" },
  { id: "5", img: "https://picsum.photos/id/14/600/900?grayscale", height: 450, url: "#" },
  { id: "6", img: "https://picsum.photos/id/15/600/750?grayscale", height: 300, url: "#" },
  { id: "7", img: "https://picsum.photos/id/16/600/800?grayscale", height: 520, url: "#" },
  { id: "8", img: "https://picsum.photos/id/17/600/700?grayscale", height: 380, url: "#" },
  { id: "9", img: "https://picsum.photos/id/18/600/900?grayscale", height: 410, url: "#" },
  { id: "10", img: "https://picsum.photos/id/19/600/750?grayscale", height: 280, url: "#" },
  { id: "11", img: "https://picsum.photos/id/20/600/800?grayscale", height: 460, url: "#" },
  { id: "12", img: "https://picsum.photos/id/21/600/700?grayscale", height: 340, url: "#" },
]

export default function Contact() {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Connect</p>
          <h2 className={styles.title}>
            <span className={styles.line1}>Get in</span>
            <span className={styles.line2}>touch</span>
          </h2>
        </div>

        <div className={styles.masonryWrapper}>
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
    </section>
  )
}