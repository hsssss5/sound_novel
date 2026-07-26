import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'light' | 'outline'
  fullWidth?: boolean
  size?: 'default' | 'compact'
  type?: 'button' | 'submit'
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = true,
  size = 'default',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${size === 'compact' ? styles.compact : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
