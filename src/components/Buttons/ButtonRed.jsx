import React from "react";
import { Link } from "react-router-dom";

const ButtonRed = ({ name, link, onClick, className }) => {
  return (
    <>
      {link ? (
        <Link to={`${link || ""}`} onClick={onClick}>
          <div
            className={` bg-Pink rounded-xl hover:bg-opacity-70  text-center font-semibold text-white cursor-pointer ${className}`}
          >
            {name}
          </div>
        </Link>
      ) : (
        <div onClick={onClick}>
          <div
            className={` bg-Pink rounded-xl hover:bg-opacity-70  text-center font-semibold text-white cursor-pointer ${className}`}
          >
            {name}
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonRed;
