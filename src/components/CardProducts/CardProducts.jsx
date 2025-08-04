import { Link } from "react-router-dom";
import Currency from "../Currency/Currency";

const CardProducts = ({ link, image, title, price, active, className, bg }) => {
  return (
    <>
      {link === "" ? (
        <div
          className={`cursor-default relative shadow-xl text-Pink flex flex-col rounded-2xl overflow-hidden bg-slate-50 ${className}`}
        >
          {image && (
            <img src={image} alt="" className="h-[105px] max-sm:h-[70px] " />
          )}
          <div className="py-1 font-bold">
            <h5 className="text-center text-xl max-sm:text-sm">{title}</h5>
            {price && (
              <h5 className="text-center text-xl">
                <Currency number={price} />
              </h5>
            )}
          </div>
          <div
            className={`absolute w-full h-full text-white font-bold text-lg flex justify-center items-center ${bg}`}
          >
            {active}
          </div>
        </div>
      ) : (
        <Link to={link || ""}>
          <div
            className={`relative shadow-xl text-Pink flex flex-col rounded-2xl overflow-hidden bg-slate-50 ${className}`}
          >
            {image && (
              <img src={image} alt="" className="h-[105px] max-sm:h-[70px]" />
            )}
            <div className="py-1 font-bold">
              <h5 className="text-center text-xl max-sm:text-sm">{title}</h5>
              {price && (
                <h5 className="text-center text-xl">
                  <Currency number={price} />
                </h5>
              )}
            </div>
            <div
              className={`absolute w-full h-full text-white font-bold text-lg flex justify-center items-center ${bg}`}
            >
              {active}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CardProducts;
