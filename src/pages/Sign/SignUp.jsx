import { Link } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { useEffect, useState } from "react";
import { usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";
import PhoneInput from "react-phone-input-2";
import { BiHide, BiShow } from "react-icons/bi";
import { EnterHandler } from "../../components";

const SignUp = () => {
  const { content } = useContextTranslate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [biShow, setBiShow] = useState(false);
  const { handleSubmit, error, loading, setFormData, setError } = usePOST({});
  useEffect(() => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("phone_number");
  }, []);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    const password = sessionStorage.getItem("password");
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");
    const phoneNumber = sessionStorage.getItem("phone_number");
    if (!email) {
      setError("Email field is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    if (!username) {
      setError("Username field is required");
      return;
    }
    if (!phoneNumber) {
      setError("Phone number field is required");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    handleSubmit(
      `signup?validate=1&local=${localStorage.getItem("language")}`,
      "/sign-up/code"
    );
  };
  document.onkeyup = function (e) {
    if (e.key === "Enter") {
      handleSubmitMain(e);
    }
  };
  const handleChangeSession = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    sessionStorage.setItem(name, value);
  };
  return (
    <>
      <EnterHandler handleEnter={handleSubmitMain} />
      <div
        style={{ direction: "ltr" }}
        className=" text-black w-full  flex items-center justify-center my-1 "
      >
        <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full  pb-2 px-3 rounded-md md:w-1/3 w-full m-3">
          <img src={Img} alt="" width={260} className="mx-auto" />
          <div>
            <h1
              style={{
                direction:
                  localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
              }}
              className="text-4xl font-semibold text-Pink mb-4"
            >
              {content.SignUp}
            </h1>
            <div className="flex flex-col justify-center  my-5  max-sm:w-full mx-auto space-y-1 ">
              <div className="">
                <>
                  <div className="flex flex-col">
                    <span
                      style={{
                        direction:
                          localStorage.getItem("language") === "ar"
                            ? "rtl"
                            : "ltr",
                      }}
                    >
                      {content.EmailOptional}
                    </span>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChangeSession}
                      placeholder={content.EnterYourEmail}
                      className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      style={{
                        direction:
                          localStorage.getItem("language") === "ar"
                            ? "rtl"
                            : "ltr",
                      }}
                    >
                      {content.UserName}
                    </span>
                    <input
                      type="name"
                      name="username"
                      onChange={handleChangeSession}
                      className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                      placeholder={content.EnterYourUser}
                    />
                  </div>
                </>

                <div className="flex flex-col">
                  <di
                    style={{
                      direction:
                        localStorage.getItem("language") === "ar"
                          ? "rtl"
                          : "ltr",
                    }}
                  >
                    {content.PhoneNumber}
                  </di>
                  <PhoneInput
                    country={"lb"}
                    alwaysDefaultMask
                    onChange={(phone) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        phone_number: "+" + phone.replace(/^9610/, '961'),
                      }));
                      sessionStorage.setItem("phone_number", "+" + phone);
                    }}
                    inputClass="!w-full !h-[50px]   !border-[#94A3B8] !rounded-lg "
                    buttonClass="!border !border-[#94A3B8] "
                    containerClass="!mb-2"
                  />
                </div>

                <>
                  <div className="flex flex-col relative">
                    <span
                      style={{
                        direction:
                          localStorage.getItem("language") === "ar"
                            ? "rtl"
                            : "ltr",
                      }}
                    >
                      {content.Password}
                    </span>
                    <input
                      type={biShow ? "text" : "password"}
                      name="password"
                      onChange={handleChangeSession}
                      className="w-full py-3 px-3 border border-[#94A3B8] outline-none bg-opacity-50 mb-2   rounded-md"
                      placeholder={"********"}
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
                  <div className="text-center mb-2 ">
                    <span>{content.toCreateACompanyAccountplease}</span>
                    <Link to="/Contact-us" className="underline  text-Pink  ">
                      {content.ContactUs}
                    </Link>
                  </div>
                </>

                {loading ? <Loading /> : ""}
                <div className="text-red-600">{error}</div>
                <button
                  onClick={handleSubmitMain}
                  className="w-3/4 block mb-2 mx-auto py-3 bg-Pink text-white rounded-md"
                >
                  {content.Next}
                </button>
              </div>
              <div className="text-center ">
                <span>{content.YouHaveAnAccount} </span>
                <Link to="/sign-in" className="underline text-Pink">
                  {content.SignIn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
