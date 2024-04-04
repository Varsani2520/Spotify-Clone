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

//   return null; // Return null if text1 is undefined
// }

// Split the name into words
// const words = text1.split(' ');
// Take the first three words
// const truncatedName = words.slice(0, 3).join(' ');


// if (!text2) {
//   return null;
// }
// const word = text2.split(' ');
// const truncatedDesc = word.slice(0, 6).join(' ');
// const finalDesc = truncatedDesc.length < text2.length ? truncatedDesc + "..." : truncatedDesc;