'use client'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styles from '../styles/loader.module.scss'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    // Simulação de carregamento (ou você pode usar imagens carregadas)
    const tl = gsap.timeline({
      onComplete: () => {
        // Animação de saída da tela preta
        gsap.to(".loader-container", {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete: onComplete // Avisa a Home que terminou
        })
      }
    })

    // Contador elegante
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className={`loader-container ${styles.loader}`}>
      <div className={styles.content}>
        <span className={styles.counter}>{counter}%</span>
        <div className={styles.barContainer}>
          <div className={styles.bar} style={{ width: `${counter}%` }} />
        </div>
      </div>
    </div>
  )
}