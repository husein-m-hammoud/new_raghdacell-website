import { Link } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import PhoneInput from "react-phone-input-2";

const Sign = () => {
  const { content } = useContextTranslate();
  const [replaceInput, setReplaceInput] = useState(false);
  const [biShow, setBiShow] = useState(false);
  const { handleSubmit, error, loading, setFormData, formData, setError } =
    usePOST();
  useEffect(() => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("phone_number");
  }, []);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const phoneNumber = sessionStorage.getItem("phone_number");
    if (!username && !phoneNumber) {
      setError("Username or Phone Number field is required");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    handleSubmit(
      `login?check=1&local=${localStorage.getItem("language")}`,
      "/sign-in/code"
    );
  };
  document.onkeyup = function (e) {
    if (e.key === "Enter") {
      handleSubmitMain(e);
    }
  };
  return (
    <div
      style={{ direction: "ltr" }}
      className=" text-black w-full  flex items-center justify-center my-1 "
    >
      <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full ma pb-2 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img src={Img} alt="" width={260} className="mx-auto" />
        <div>
          <h1
            style={{
              direction:
                localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
            }}
            className="text-4xl font-semibold text-Pink mb-4"
          >
            {content.SignIn}
          </h1>
          <div className="flex flex-col justify-center   space-y-2 ">
            <div className="">
              <div
                className="flex justify-between  items-center transition-all w-full mb-1"
                style={{
                  direction:
                    localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
                }}
              >
                <span>
                  {!replaceInput ? content.PhoneNumber : content.UserName}
                </span>
                <button
                  className="px-2  py-1 bg-Pink text-white hover:bg-opacity-70  rounded-2xl"
                  onClick={() => {
                    setReplaceInput(!replaceInput);
                    sessionStorage.removeItem("username");
                    sessionStorage.removeItem("phone_number");
                  }}
                >
                  {replaceInput ? content.PhoneNumber : content.UserName}
                </button>
              </div>
              {replaceInput ? (
                <input
                  type="text"
                  name="username"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    });
                    sessionStorage.setItem("username", e.target.value);
                  }}
                  placeholder={content.EnterYourUserNameOrPhone}
                  className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                />
              ) : (
                <PhoneInput
                  country={"lb"}
                  alwaysDefaultMask
                  onChange={(phone) => {
                    setFormData({ ...formData, phone_number: "+" + phone.replace(/^9610/, '961') });
                    sessionStorage.setItem("phone_number", "+" + phone.replace(/^9610/, '961'));
                  }}
                  inputClass="!w-full !h-[50px]   !border-[#94A3B8] !rounded-lg "
                  buttonClass="!border !border-[#94A3B8] "
                  containerClass="!mb-2"
                />
              )}
            </div>
            <div className="flex flex-col relative">
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
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  sessionStorage.setItem("password", e.target.value);
                }}
                className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                placeholder="********"
              />
              {biShow ? (
                <BiShow
                  onClick={() => setBiShow(false)}
                  size={20}
                  className="absolute right-4 top-10 cursor-pointer"
                />
              ) : (
                <BiHide
                  onClick={() => setBiShow(true)}
                  size={20}
                  className="absolute right-4 top-10 cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-end items-center">
              <Link to="/forget-password" className="underline text-Pink">
                {content.forgetPassword}
              </Link>
            </div>
            {loading ? <Loading /> : ""}
            <div className="text-red-600">{error}</div>
            <button
              className="w-3/4 mx-auto py-3 bg-Pink text-white hover:bg-opacity-70 text-xl rounded-2xl"
              onClick={handleSubmitMain}
            >
              {content.Next}
            </button>
            <div className="text-center  cursor-pointer">
              <span> {content.DontHaveAnAccount} </span>
              <Link to="/sign-up" className="underline text-Pink">
                {content.CreateAnnAccount}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
