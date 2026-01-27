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
    
    // Media query para GSAP: ajusta a força do parallax no mobile
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      // Desktop: Efeito Dennis Snellenberg completo
      gsap.fromTo(innerContentRef.current, 
        { y: "-40%" }, 
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      )

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
    });

    mm.add("(max-width: 768px)", () => {
      // Mobile: Efeito reduzido para não causar bugs de altura
      gsap.fromTo(innerContentRef.current, 
        { y: "-15%" }, 
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
          }
        }
      )
    });

    return () => mm.revert(); // Limpa as animações ao desmontar
  }, [])

  return (
    <footer ref={containerRef} className={styles.footer}>
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
            <span>Local Time {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</span>
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