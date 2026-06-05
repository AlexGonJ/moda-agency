'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '../styles/navbar.module.scss'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false) // Troca Lista -> Sanduiche
  const [isPastHero, setIsPastHero] = useState(false) // Saiu da Hero
  const navRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 1. Troca os links pelo sanduíche (ainda na Hero)
    const t1 = ScrollTrigger.create({
      start: "top top",
      end: "+=400", 
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0.9)
      }
    })

    // 2. Detecta quando a Hero termina
    const t2 = ScrollTrigger.create({
      trigger: "section:first-of-type", // Alvo: Sua Hero
      start: "bottom 10%", // Quando o fim da hero chega no topo
      onEnter: () => setIsPastHero(true),
      onEnterBack: () => setIsPastHero(false),
    })

    return () => {
      t1.kill()
      t2.kill()
    }
  }, [])

  return (
    <nav 
      ref={navRef} 
      className={`${styles.nav} ${isPastHero ? styles.afterHero : ''}`}
    >
      <span className={styles.logo}>MODA AGENCY</span>
      
      <div className={styles.navRight}>
        {/* Lógica mantida: O CSS cuidará de esconder isso no mobile via @media */}
        {!isScrolled && !isPastHero && (
          <ul className={styles.menu}>
            <li><a href="#sobre" className={styles.menuItem}>Sobre</a></li>
            <li><a href="#projetos" className={styles.menuItem}>Cases</a></li>
            <li><a href="#contato" className={styles.menuItem}>Contato</a></li>
          </ul>
        )}

        {/* O Burger aparecerá se houver scroll OU se for mobile (via CSS) */}
        <div 
          className={styles.burgerWrapper}
          style={{ 
            display: (isScrolled || isPastHero) ? 'flex' : 'none' 
          }}
        >
          <span>Menu</span>
          <div className={styles.burgerLines}>
            <div />
            <div />
          </div>
        </div>
      </div>
    </nav>
  )
}