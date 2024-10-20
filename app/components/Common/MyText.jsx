import React from "react";
import style from "../../style.css";
const MyText = ({ text1, text2, className, style }) => {
  return (
    <div className={className} style={style}>
      <h4>{text1}</h4>
      <h5 style={{marginTop: "10px"}}>{text2}</h5>
    </div>
  );
};

export default MyText;
