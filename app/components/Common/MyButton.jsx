import React from "react";
const MyButton = ({ className, title, onClick }) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default MyButton;
