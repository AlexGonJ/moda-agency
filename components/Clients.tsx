'use client'

import styles from '../styles/clients.module.scss'

const clients = [
  'ZARA',
  'FARM',
  'ANIMALE',
  'RESERVA',
  'OSKLEN',
  'HERING',
  'ELLUS',
  'COLCCI',
  'AMARO',
  'CRIS BARROS',
  // Duplicate for infinite scroll
  'ZARA',
  'FARM',
  'ANIMALE',
  'RESERVA',
  'OSKLEN',
  'HERING',
  'ELLUS',
  'COLCCI',
  'AMARO',
  'CRIS BARROS',
]

export default function Clients() {
  return (
    <section className={styles.clients}>
      <div className={styles.carouselContainer}>
        <div className={styles.track}>
          {clients.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className={styles.clientItem}
            >
              <span className={styles.clientName}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
