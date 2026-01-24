'use client'
import Masonry from './Masonry'
import styles from '../styles/contact.module.scss'

// Lista robusta com 12 itens para garantir preenchimento
const items = [
  { id: "1", img: "https://picsum.photos/id/10/600/900?grayscale", url: "#", height: 400 },
  { id: "2", img: "https://picsum.photos/id/11/600/750?grayscale", url: "#", height: 280 },
  { id: "3", img: "https://picsum.photos/id/12/600/800?grayscale", url: "#", height: 500 },
  { id: "4", img: "https://picsum.photos/id/13/600/700?grayscale", url: "#", height: 320 },
  { id: "5", img: "https://picsum.photos/id/14/600/900?grayscale", url: "#", height: 450 },
  { id: "6", img: "https://picsum.photos/id/15/600/750?grayscale", url: "#", height: 300 },
  { id: "7", img: "https://picsum.photos/id/16/600/800?grayscale", url: "#", height: 520 },
  { id: "8", img: "https://picsum.photos/id/17/600/700?grayscale", url: "#", height: 380 },
  { id: "9", img: "https://picsum.photos/id/18/600/900?grayscale", url: "#", height: 410 },
  { id: "10", img: "https://picsum.photos/id/19/600/750?grayscale", url: "#", height: 280 },
  { id: "11", img: "https://picsum.photos/id/20/600/800?grayscale", url: "#", height: 460 },
  { id: "12", img: "https://picsum.photos/id/21/600/700?grayscale", url: "#", height: 340 },
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