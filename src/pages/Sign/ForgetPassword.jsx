import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";
import { useEffect } from "react";

const ForgetPassword = () => {
  const { content } = useContextTranslate();
  const { handleSubmit, error, loading, handleChangeInput, formData } = usePOST(
    {}
  );
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      `send/verification-code?local=${localStorage.getItem("language")}`,
      "/verification-code"
    );
  };
  useEffect(() => {
    sessionStorage.setItem("email", formData?.email);
  }, [formData]);
  return (
    <div
      style={{ direction: "ltr" }}
      className=" text-black w-full  flex items-center justify-center my-4 "
    >
      <div className="bg-white shadow-md shadow-Pink  bg-opacity-50 max-sm:w-full ma py-5 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img src={Img} alt="" width={260} className="mx-auto" />
        <div className=" flex justify-center items-center">
          <div className="w-full">
            <h1 className="text-4xl text-center font-semibold text-Pink mb-4">
              {content.ForgetPassword}
            </h1>
            <div className="flex flex-col justify-center my-5  max-sm:w-full mx-auto space-y-1 ">
              <div className="flex flex-col">
                <span
                  style={{
                    direction:
                      localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
                  }}
                >
                  {content.EnterYourEmail}
                </span>
                <input
                  type="text"
                  name="email"
                  onChange={handleChangeInput}
                  className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                  placeholder={content.EnterYourEmail}
                />
              </div>
              {loading ? <Loading /> : ""}
              <div className="text-red-600">{error}</div>

              <button
                className="w-3/4 mx-auto py-3 bg-Pink text-white text-xl rounded-2xl"
                onClick={handleSubmitMain}
              >
                {content.Next}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
