import React from 'react'
import style from '../../style.css'
const MyButton = ({className,title}) => {
  return (
    <div>
      <button className={className}>{title}</button>
    </div>
  )
}

export default MyButton
