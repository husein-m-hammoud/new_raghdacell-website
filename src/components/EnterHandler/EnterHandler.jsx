import React, { useEffect, useCallback } from "react";

const EnterHandler = ({ handleEnter }) => {
  const handleKeyUp = useCallback(
    (e) => {
        
      if (e.key === "Enter") {
        handleEnter();
      }
    },
    [handleEnter]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return <></>;
};

export default EnterHandler;
