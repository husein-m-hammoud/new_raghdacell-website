import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


const UnavvailablePopup = ({ isOpen, onClose, handleGoBackAndReload }) => {
    const [isHidden, setIsHidden] = useState(!isOpen);
    let language = localStorage.getItem("language");
  
    const handlePopupClose = () => {
      setIsHidden(true);
      onClose();
    };
  
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center z-10  ${
          isHidden ? 'hidden' : ''
        }`}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white rounded-lg p-8 max-w-md z-20 w-2/4 text-lg text-center">
          <p>  { language === "en"
              ? "Sorry, this product is currently unavailable."
              : "عذرا، هذا المنتج غير متوفر حاليا."}</p>
          <button
            //onClick={handleGoBackAndReload}
            className="mt-4 bg-Pink hover:bg-red-700 text-white text-md font-bold py-2 px-4 rounded"
          >
             <NavLink to="/" onClick={handleGoBackAndReload}>
             { language === "en"
              ? "okay"
              : "تمام"}
             </NavLink>
           
          </button>
        </div>
      </div>
    );
  };
  export default UnavvailablePopup;