import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import copyIcon from "../../images/Icon feather-copy.png";

const CopyBox = React.forwardRef(({ text, copied, onCopy }, ref) => {
  return (
    <div className="bg-[#9A9A9A] text-white rounded-2xl py-5 px-8 flex justify-between items-center">
      <span ref={ref} className="break-all">{text}</span>
      {copied ? (
        <FaRegCheckCircle size={30} />
      ) : (
        <img
          src={copyIcon}
          onClick={onCopy}
          alt="Copy"
          width={25}
          className="cursor-pointer"
        />
      )}
    </div>
  );
});

export default CopyBox;
