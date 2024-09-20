import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'
import styles from '../style/Checkbox.module.css'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

function CheckBox({ className, ...props }: CheckBoxProps) {
  return (
    <div className={cn(className, styles.wrapper)}>
      <input
        type="checkbox"
        className={styles.input}
        {...props}
      />
    </div>
  )
}

export default CheckBox
