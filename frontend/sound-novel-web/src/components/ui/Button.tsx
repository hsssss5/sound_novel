import type { ReactNode } from 'react'

import styles from './Button.module.css'



interface ButtonProps {

  children: ReactNode

  onClick?: () => void

  variant?: 'primary' | 'secondary' | 'light' | 'outline'

  fullWidth?: boolean

  type?: 'button' | 'submit'

}



export function Button({

  children,

  onClick,

  variant = 'primary',

  fullWidth = true,

  type = 'button',

}: ButtonProps) {

  return (

    <button

      type={type}

      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}

      onClick={onClick}

    >

      {children}

    </button>

  )

}


