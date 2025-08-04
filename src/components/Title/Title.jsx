import React from "react";

const Title = (props) => {
  return (
    <div className={`mb-4 ${localStorage.getItem("language")=== "en"? "border-l-[6px]":"border-r-[6px]"} border-Pink text-Purple font-bold text-3xl px-5 py-2 rounded-md `}>
      {props.title}
    </div>
  );
};

export default Title;
