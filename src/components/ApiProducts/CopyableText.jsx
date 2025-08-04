import React, { useState } from 'react';
import { FaRegCopy, FaRegCheckCircle } from 'react-icons/fa';

const CopyableText = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000); // Reset copy state after 1 second
  };

  return (
    <div>
      {/* <span>{text}</span> */}
      <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }}></span>
      <button onClick={copyToClipboard}>
        {isCopied ? <FaRegCheckCircle /> : <FaRegCopy />}
      </button>
      
    </div>
  );
};

export default CopyableText;
