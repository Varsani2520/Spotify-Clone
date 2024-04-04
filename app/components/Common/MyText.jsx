import React from 'react'
import style from '../../style.css'
const MyText = ({text1,text2,className}) => {
  return (
    <div className={className}>
      <h4>{text1}</h4>
      <h5>{text2}</h5>
    </div>
  )
}

export default MyText
