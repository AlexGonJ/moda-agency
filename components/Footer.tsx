'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '../styles/footer.module.scss'

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
  },
  {
    label: 'Behance',
    href: '#',
  },
  {
    label: 'LinkedIn',
    href: '#',
  },
]

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const innerContentRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        // Parallax suave do conteúdo do rodapé
        gsap.fromTo(
          innerContentRef.current,
          { y: '-10%' },
          {
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      })

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      reveal
        .from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        })
        .from(
          gridRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .from(
          bottomRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )

      return () => mm.revert()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={containerRef} className={styles.footer}>
      <div className={styles.roundedEdge} />
      
      <div ref={innerContentRef} className={styles.inner}>
        <div className={styles.topSection}>
          <h2 ref={titleRef} className={styles.brandTitle}>
            MODA AGENCY
          </h2>
          <p className={styles.brandStatement}>
            Estratégia criativa e branding para marcas de moda que querem liderar.
          </p>
        </div>

        <div ref={gridRef} className={styles.footerGrid}>
          <div className={styles.column}>
            <h3>Nossa Abordagem</h3>
            <p className={styles.philosophyText}>
              Combinamos visão estratégica com execução criativa impecável para posicionar marcas de moda no centro da cultura contemporânea.
            </p>
          </div>

          <div className={styles.column}>
            <h3>Serviços</h3>
            <ul>
              <li><a href="#projetos">Branding & Identidade</a></li>
              <li><a href="#projetos">Campanhas Digitais</a></li>
              <li><a href="#projetos">Direção Criativa</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Agência</h3>
            <ul>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#sobre">Nosso Método</a></li>
              <li><a href="#contato">Trabalhe Conosco</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3>Contato & Redes</h3>
            <ul className={styles.contactList}>
              <li>Email: <span>contato@modaagency.com</span></li>
              <li>Telefone: <span>+55 11 99999-8888</span></li>
              <li className={styles.socialsInline}>
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} className={styles.socialLink}>
                    {social.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div ref={bottomRef} className={styles.bottom}>
          <div className={styles.info}>
            <span>&copy; {new Date().getFullYear()} MODA AGENCY. Todos os direitos reservados.</span>
            <span>
              Horário Local {new Date().getHours()}:
              {new Date().getMinutes().toString().padStart(2, '0')}
            </span>
          </div>

          <div className={styles.metaLinks}>
            <span>São Paulo, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
