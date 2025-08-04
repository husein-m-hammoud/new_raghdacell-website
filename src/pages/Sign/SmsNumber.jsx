import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import OTPInput from "react-otp-input";

import { useLOGIN, usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";
const SmsNumber = ({ sign }) => {
  const { content } = useContextTranslate();
  const [remainingTime, setRemainingTime] = useState(60);
  const [otp, setOtp] = useState("");
  const { handleSubmit, error, loading, setFormData } = useLOGIN({});
  const {
    handleSubmit: handleSubmitNumber,
    loading: loadingNumber,
    dataPlayer,
    setFormData: setFormDataNumber,
  } = usePOST({});
  useEffect(() => {
    !sign
      ? setFormData({
          verification_code: otp,
          username: sessionStorage.getItem("username"),
          phone_number: sessionStorage.getItem("phone_number"),
          password: sessionStorage.getItem("password"),
          email: sessionStorage.getItem("email"),
          [sessionStorage.getItem("fcm_token") ? "fcm_token" : ""]:
            sessionStorage.getItem("fcm_token")
              ? sessionStorage.getItem("fcm_token")
              : "",
        })
      : setFormData({
          verification_code: otp,
          username: sessionStorage.getItem("username"),
          phone_number: sessionStorage.getItem("phone_number"),
          password: sessionStorage.getItem("password"),
          [sessionStorage.getItem("fcm_token") ? "fcm_token" : ""]:
            sessionStorage.getItem("fcm_token")
              ? sessionStorage.getItem("fcm_token")
              : "",
        });
  }, [otp]);
  useEffect(() => {
    !sign
      ? setFormDataNumber({
          username: sessionStorage.getItem("username"),
          phone_number: sessionStorage.getItem("phone_number"),
          password: sessionStorage.getItem("password"),
          email: sessionStorage.getItem("email"),
        })
      : setFormDataNumber({
          username: sessionStorage.getItem("username"),
          phone_number: sessionStorage.getItem("phone_number"),
          password: sessionStorage.getItem("password"),
        });
  }, []);

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      sign
        ? `login?auth=1&local=${localStorage.getItem("language")}`
        : `signup?auth=1&local=${localStorage.getItem("language")}`
    );
  };

  const handleSubmitNumberMain = (e) => {
    e.preventDefault();
    handleSubmitNumber(
      sign
        ? `login?check=1&local=${localStorage.getItem("language")}`
        : `signup?validate=1&local=${localStorage.getItem("language")}`,
      "",
      true
    );
  };

  document.onkeyup = function (e) {
    if (e.key === "Enter") {
      handleSubmitMain(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    if (remainingTime === 0) {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [remainingTime]);
  useEffect(() => {
    if (dataPlayer?.data.code === 200) {
      setRemainingTime(60);
    }
  }, [dataPlayer?.data.code]);

  return (
    <div
      style={{ direction: "ltr" }}
      className=" text-black w-full  flex items-center justify-center my-1 "
    >
      <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full  pb-2 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img src={Img} alt="" width={260} className="mx-auto" />
        <div>
          <h1 className="text-lg text-center mb-4">
            {sign
              ? content.codeSignIn + " " + sessionStorage.getItem("number")
              : content.code}
          </h1>
          <div className="flex flex-col justify-center my-5  max-sm:w-full mx-auto space-y-1 ">
            <>
              <div className=" w-fit mx-auto ">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputStyle="!w-10 border border-black rounded-xl h-12 w-12 mx-2 px-3"
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              {loading || loadingNumber ? <Loading /> : ""}
              <h1 className="text-center">
                {remainingTime === 0 ? (
                  <div
                    className="text-red-600 cursor-pointer"
                    onClick={handleSubmitNumberMain}
                  >
                    اعد أرسال الكود
                  </div>
                ) : (
                  "00:" + remainingTime
                )}
              </h1>
              <div className="text-red-600">{error}</div>
              <button
                onClick={handleSubmitMain}
                className="w-3/4 mx-auto py-3 bg-Pink text-white text-xl rounded-2xl"
              >
                {content.Send}
              </button>
            </>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SmsNumber;
