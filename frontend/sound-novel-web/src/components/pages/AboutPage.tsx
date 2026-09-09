import { aboutIntro } from '../../content/about'
import { castMembers, teamMembers } from '../../content/team'
import type { CreditPerson } from '../../content/types'
import styles from './AboutPage.module.css'

const CAST_ROW_SIZES = [3, 3, 3, 1, 2] as const
const TEAM_ROW_SIZES = [3, 3, 1] as const

function chunkBySizes<T>(items: T[], sizes: readonly number[]): T[][] {
  const rows: T[][] = []
  let index = 0
  for (const size of sizes) {
    rows.push(items.slice(index, index + size))
    index += size
  }
  if (index < items.length) {
    rows.push(items.slice(index))
  }
  return rows
}

export function AboutPage() {
  const castRows = chunkBySizes(castMembers, CAST_ROW_SIZES)
  const teamRows = chunkBySizes(teamMembers, TEAM_ROW_SIZES)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>О проекте</h1>

      <div className={styles.intro}>
        {aboutIntro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      <section className={styles.section} aria-labelledby="cast-heading">
        <h2 id="cast-heading" className={styles.sectionTitle}>
          В ролях
        </h2>
        <div className={styles.grid}>
          {castRows.map((row) => (
            <div key={row.map((p) => p.id).join('-')} className={styles.row}>
              {row.map((person) => (
                <CreditCard key={person.id} person={person} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="team-heading">
        <h2 id="team-heading" className={styles.sectionTitle}>
          Команда проекта
        </h2>
        <div className={styles.grid}>
          {teamRows.map((row) => (
            <div key={row.map((p) => p.id).join('-')} className={styles.row}>
              {row.map((person) => (
                <CreditCard key={person.id} person={person} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function CreditCard({ person }: { person: CreditPerson }) {
  const isAlexandra = person.id === 'lead'

  return (
    <article className={styles.card}>
      {person.photoUrl ? (
        isAlexandra ? (
          <div className={styles.photoAlexandraWrap}>
            <img
              className={`${styles.photo} ${styles.photoAlexandra}`}
              src={person.photoUrl}
              alt=""
            />
          </div>
        ) : (
          <img className={styles.photo} src={person.photoUrl} alt="" />
        )
      ) : (
        <div className={styles.photoPlaceholder} aria-hidden="true" />
      )}
      <p className={styles.role}>{person.role}</p>
      <p className={styles.name}>{person.name}</p>
    </article>
  )
}
