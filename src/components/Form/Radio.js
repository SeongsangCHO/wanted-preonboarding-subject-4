import React from 'react'

function Radio({ id, label, ...rest }) {
  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input type="radio" id={id} className={styles.input} {...rest} /> {label}
    </label>
  )
}

const styles = {
  wrapper: 'inline-flex items-center',
  input: 'mr-2'
}

export default Radio
