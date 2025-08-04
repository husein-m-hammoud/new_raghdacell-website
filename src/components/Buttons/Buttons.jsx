import React from "react";

const Buttons = ({ name, className, onClick }) => {
  return (
    <div
      onClick={onClick}

      className={` ${className}   py-2   rounded-xl hover:  text-center  font-semibold border border-Pink text-Pink cursor-pointer`}
    >
      {name}
    </div>
  );
};

export default Buttons;
