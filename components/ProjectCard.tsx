import styles from '../styles/project-card.module.scss'

interface Props {
  title: string
  description: string
}

export default function ProjectCard({ title, description }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
