import type { InputHTMLAttributes } from 'react'
import styles from '../style/Checkbox.module.css'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

function CheckBox({ ...props }: CheckBoxProps) {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" className={styles.input} {...props} />
    </div>
  )
}

export default CheckBox
