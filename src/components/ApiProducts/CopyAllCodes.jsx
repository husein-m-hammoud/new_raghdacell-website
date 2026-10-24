import React, { useState } from "react";
import { FaRegCopy, FaRegCheckCircle } from "react-icons/fa";

/**
 * "Copy all" for a list of delivered codes. CopyableText already copies one
 * line at a time, which is tedious when an order delivers several codes, so
 * this puts every code on the clipboard in one go, newline separated.
 *
 * Renders nothing for a single code -- the per-line button is enough there.
 */
const CopyAllCodes = ({ codes = [], label = "Copy all", className = "" }) => {
  const [isCopied, setIsCopied] = useState(false);

  const values = codes
    .map((item) => (typeof item === "string" ? item : item?.code))
    .filter((code) => code !== null && code !== undefined && code !== "");

  if (values.length < 2) {
    return null;
  }

  const copyAll = () => {
    navigator.clipboard.writeText(values.join("\n"));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <button
      type="button"
      onClick={copyAll}
      title={`${label} (${values.length})`}
      className={`flex items-center gap-1.5 text-sm font-semibold text-Pink hover:underline mb-1.5 ${className}`}
    >
      {isCopied ? <FaRegCheckCircle size={16} /> : <FaRegCopy size={16} />}
      <span>
        {label} ({values.length})
      </span>
    </button>
  );
};

export default CopyAllCodes;
