import type { CharacterDossier } from '../../content/types'
import styles from './DossierCard.module.css'

interface DossierCardProps {
  dossier: CharacterDossier
}

export function DossierCard({ dossier }: DossierCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.fields}>
          <Field label="ИМЯ" value={dossier.name} />
          <Field label="ВОЗРАСТ" value={dossier.age} />
          <Field label="ЗНАК ЗОДИАКА" value={dossier.zodiac} />
        </div>
        <div className={styles.polaroid}>
          <span className={styles.clip} aria-hidden="true" />
          <img src={dossier.photoUrl} alt="" className={styles.photo} />
        </div>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>РОД ДЕЯТЕЛЬНОСТИ</th>
            <td>{dossier.occupation}</td>
          </tr>
          <tr>
            <th colSpan={2}>О СЕБЕ</th>
          </tr>
          <tr>
            <td colSpan={2} className={styles.wide}>
              {dossier.about}
            </td>
          </tr>
          <tr>
            <th colSpan={2}>ЗАБАВНЫЙ ФАКТ</th>
          </tr>
          <tr>
            <td colSpan={2} className={styles.wide}>
              {dossier.funFact}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
      <span className={styles.fieldLine} />
    </div>
  )
}
