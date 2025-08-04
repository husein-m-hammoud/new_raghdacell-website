import { useEffect, useRef, useState } from "react";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { useContextTranslate } from "../../Context/ContextAPI";
import Loading from "../../Tools/Loading";
import { usePOST } from "../../Tools/APIs";
import { useNavigate } from "react-router-dom";

const Code = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const naviget = useNavigate();
  const v1 = useRef();
  const v2 = useRef();
  const v3 = useRef();
  const v4 = useRef();

  if (value1.length > 0) {
    v2.current.focus();
  }
  if (value2.length > 0) {
    v3.current.focus();
  }
  if (value3.length > 0) {
    v4.current.focus();
  }
  const { content } = useContextTranslate();
  const { setFormData, handleSubmit, error, loading, dataPlayer, setError } =
    usePOST({});
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("check/verification-code", "", true);
  };

  useEffect(() => {
    setFormData({
      verification_code: `${value1}${value2}${value3}${value4}`,
      email: sessionStorage.getItem("email"),
    });
    if (dataPlayer?.data.data.is_valid) {
      naviget("/set-password");
    } else if (dataPlayer?.data.data.is_valid === false) {
      setError(
        localStorage.getItem("language") === "en"
          ? "error in verification code"
          : "خطأ في رمز التحقق"
      );
    }
    sessionStorage.setItem("code", `${value1}${value2}${value3}${value4}`);
  }, [value1, value2, value3, value4, dataPlayer?.data.data.is_valid]);

  return (
    <div
      style={{ direction: "ltr" }}
      className=" text-black w-full   flex items-center justify-center my-4 "
    >
      <div className="bg-white shadow-md shadow-Pink  bg-opacity-50 max-sm:w-full ma py-5 rounded-2xl md:w-1/3 w-full m-3">
        <div className="flex justify-center flex-col items-center h-full  text-center  mx-auto ">
          <img src={Img} alt="" width={260} />
          <div>
            <h1 className="font-semibold text-4xl">
              {content.verificationCode}
            </h1>
            <p>{content.WeHaveSentAVerificationCodeToYourEmail}</p>
            <p>{sessionStorage.getItem("email")}</p>
          </div>
          <div className="flex justify-center items-start space-x-5 my-6">
            <input
              type="number"
              ref={v1}
              value={value1}
              onChange={(e) => setValue1(e.target.value.slice(0, 1))}
              className="w-14 bg-slate-400 p-1 text-Pink text-4xl text-center h-14 rounded-md"
            />
            <input
              ref={v2}
              maxLength={1}
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value.slice(0, 1))}
              className="w-14 p-1 bg-slate-400 text-Pink text-4xl text-center h-14 rounded-md"
            />
            <input
              maxLength={1}
              type="number"
              ref={v3}
              value={value3}
              onChange={(e) => setValue3(e.target.value.slice(0, 1))}
              className="w-14 p-1 bg-slate-400 text-Pink text-4xl text-center h-14 rounded-md"
            />
            <input
              ref={v4}
              maxLength={1}
              type="number"
              value={value4}
              onChange={(e) => setValue4(e.target.value.slice(0, 1))}
              className="w-14 p-1 bg-slate-400 text-Pink text-4xl text-center h-14 rounded-md"
            />
          </div>
          {/* <div className="text-center">
            <time>00:30 </time>
            {content.ResendTheCode}
          </div> */}
          {loading ? <Loading /> : ""}
          <div className="text-red-600">{error}</div>

          <button
            onClick={handleSubmitMain}
            className="w-3/4 mx-auto py-3 px-10 bg-Pink text-white text-xl rounded-2xl mt-14"
          >
            {content.Verification}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Code;
