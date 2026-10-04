import { useEffect, useState } from 'react'
import { getUniqueVisitorCount } from '../../lib/visitors'
import { useHeaderChrome } from '../layout/HeaderChromeContext'
import styles from './DevPage.module.css'

export function DevPage() {
  const { setShowBrandLogo } = useHeaderChrome()
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setShowBrandLogo(true)
    return () => setShowBrandLogo(false)
  }, [setShowBrandLogo])

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const value = await getUniqueVisitorCount()
        if (!cancelled) {
          setCount(value)
        }
      } catch {
        if (!cancelled) {
          setError('Не удалось загрузить счётчик')
          setCount(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className={styles.page}>
      <p className={styles.line} aria-live="polite">
        Уникальные посетители:{' '}
        <span className={styles.count}>{loading ? '…' : error ? '—' : count}</span>
      </p>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
