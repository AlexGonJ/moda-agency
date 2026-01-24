'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/footer.module.scss'

export default function Footer() {
  const containerRef = useRef(null)
  const innerContentRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // O segredo do parallax do Dennis: o conteúdo interno começa muito abaixo
    // e sobe enquanto o container se revela.
    gsap.fromTo(innerContentRef.current, 
      { y: "-40%" }, 
      {
        y: "0%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Começa assim que o topo do footer aparece no pé da página
          end: "bottom bottom", // Termina quando o footer preenche a tela
          scrub: true
        }
      }
    )

    // Parallax extra para o círculo (ele se move em velocidade diferente)
    gsap.fromTo(circleRef.current,
      { y: 100 },
      {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    )
  }, [])

  return (
    <footer ref={containerRef} className={styles.footer}>
      {/* A curva agora é uma DIV preenchida que suaviza a transição */}
      <div className={styles.roundedEdge}></div>

      <div ref={innerContentRef} className={styles.inner}>
        <div className={styles.main}>
          <h2 className={styles.title}>
            LET'S WORK <br />
            <span className={styles.outline}>TOGETHER</span>
          </h2>
          
          <div ref={circleRef} className={styles.circleWrapper}>
            <div className={styles.circle}>
              <span>Get in touch</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.info}>
            <span>© 2026 Alex Design</span>
            <span>Local Time {new Date().getHours()}:{new Date().getMinutes()}</span>
          </div>
          <div className={styles.socials}>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}