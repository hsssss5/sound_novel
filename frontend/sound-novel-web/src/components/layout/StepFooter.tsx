import type { ReactNode } from 'react'
import styles from './StepFooter.module.css'

interface StepFooterProps {
  children: ReactNode
}

export function StepFooter({ children }: StepFooterProps) {
  return <footer className={styles.footer}>{children}</footer>
}

export function StepNav({ children }: StepFooterProps) {
  return <div className={styles.nav}>{children}</div>
}
