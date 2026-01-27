'use client'
import styles from '../styles/about.module.scss'
import ScrollReveal from './ScrollReveal'

export default function About() {
  return (
    <section className={styles.about}>
      {/* Lado Esquerdo: Título maior */}
      <div className={styles.titleWrapper}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10} // Reduzi levemente para não pesar no mobile
          containerClassName={styles.customH2}
        >
          Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.
        </ScrollReveal>
      </div>

      {/* Lado Direito: Parágrafo menor */}
      <div className={styles.textWrapper}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          blurStrength={5}
          containerClassName={styles.customP}
        >
          Focused on crafting thoughtful interfaces and meaningful digital products that leave a lasting impression.
        </ScrollReveal>
      </div>
    </section>
  )
}