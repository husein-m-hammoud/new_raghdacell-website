import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { useState } from "react";
import { useEffect } from "react";
import { usePOST } from "../../Tools/APIs";
import { Loading } from "../../components";

const SetPassword = () => {
  const { content } = useContextTranslate();
  const [biShow, setBiShow] = useState(false);
  const {
    setFormData,
    handleSubmit,
    error,
    loading,
    handleChangeInput,
    formData,
  } = usePOST({});
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("reset-password", "/sign-in");
  };

  useEffect(() => {
    setFormData({
      ...formData,
      verification_code: sessionStorage.getItem("code"),
      email: sessionStorage.getItem("email"),
    });
  }, []);
  return (
    <div
      style={{ direction: "ltr" }}
      className=" text-black w-full  flex items-center justify-center my-4 "
    >
      <div className="bg-white shadow-md shadow-Pink  bg-opacity-50 max-sm:w-full ma px-3 py-5 rounded-2xl md:w-1/3 w-full m-3 ">
        <img src={Img} alt="" width={260} className="mx-auto" />
        <div>
          <h1 className="text-4xl text-Pink font-semibold mb-4">
            {content.SetPassword}
          </h1>
          <div className="flex flex-col  justify-center my-5  max-sm:w-full mx-auto space-y-1 ">
            <div className="flex flex-col">
              <span
                style={{
                  direction:
                    localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
                }}
              >
                {content.Password}
              </span>
              <input
                type={biShow ? "text" : "password"}
                name="password"
                placeholder={"********"}
                onChange={handleChangeInput}
                className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <span
                style={{
                  direction:
                    localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
                }}
              >
                {content.ConfirmPassword}
              </span>
              <input
                type={biShow ? "text" : "password"}
                name="password_confirmation"
                className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                placeholder={"********"}
                onChange={handleChangeInput}
              />
            </div>
            <div className="text-end text-l text-Brown flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                className="relative w-5 h-5"
                onChange={(e) => setBiShow(e.target.checked)}
              />
              <span>Show Password</span>
            </div>
            {loading ? <Loading /> : ""}
            <div className="text-red-600">{error}</div>
            <button
              onClick={handleSubmitMain}
              className="w-3/4 mx-auto py-3 bg-Pink   text-white text-xl rounded-2xl"
            >
              {content.Save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
