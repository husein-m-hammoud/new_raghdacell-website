import { useContextTranslate } from "../../Context/ContextAPI";
import { Link } from "react-router-dom";

const PopUp = (props) => {
  const { showPopUp, setShowPopUp } = useContextTranslate();
  const { content } = useContextTranslate();
  return (
    <>
      {showPopUp && (
        <>
          <div
            onClick={() => setShowPopUp(false)}
            className={`absolute -top-7 left-0 bg-black opacity-40 w-full h-full z-50 m-0 p-0 `}
          ></div>
          {localStorage.getItem("token") ? (
            <div
              className={`rounded-xl bg-white w-[360px] max-sm:w-[90%]  fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2`}
            >
              <div
                className={`flex flex-col justify-between h-full py-2 px-3 space-y-2`}
              >
                <div>{props.children}</div>
                <div className={`flex gap-2 ${props.pop ? "hidden" : ""}`}>
                  <button
                    className="w-full py-2 border border-Pink rounded-2xl text-Pink   "
                    onClick={() => setShowPopUp(false)}
                  >
                    {content.Cancel}
                  </button>
                  {props.loading ? (
                    <button className="w-full py-2 border border-Pink rounded-2xl text-white bg-Purple bg-opacity-90">
                      {content.Confirm}
                    </button>
                  ) : (
                    <button
                      className="w-full py-2 border border-Pink rounded-2xl text-white bg-Purple hover:bg-opacity-90"
                      onClick={props.onClick}
                      disabled={props.disabled}
                    >
                      {content.Confirm}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[30vh] p-10 rounded-2xl flex flex-col max-sm:w-[90%]  justify-center items-center bg-white fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-50">
              <p className="text-center mb-3 text-2xl text-Pink">
                {content.youhavetosignin}
              </p>
              <div className=" flex justify-center items-center gap-3">
                <li className="text-xl underline list-none">
                  <Link to="/sign-up">{content.SignUp}</Link>
                </li>
                /
                <li className="text-xl underline list-none">
                  <Link to="/sign-in">{content.SignIn}</Link>
                </li>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PopUp;
