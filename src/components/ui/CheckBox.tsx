import React from 'react'
import styles from '../style/Checkbox.module.css'

function CheckBox() {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" className={styles.input} />
    </div>
  )
}

export default CheckBox
