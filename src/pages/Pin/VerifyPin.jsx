import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { usePOST, logout } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";

const VerifyPin = () => {
  const { content } = useContextTranslate();
  const [pin, setPin] = useState("");
  const { handleSubmit, error, loading, setFormData, formData, dataPlayer } =
    usePOST({});

  useEffect(() => {
    if (dataPlayer?.data?.code === 200) {
      sessionStorage.setItem("pin_verified", "1");
      window.location.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlayer?.data?.code]);

  useEffect(() => {
    setFormData({ pin_code: pin });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  useEffect(() => {
    if (formData?.pin_code?.length === 4) {
      handleSubmit("pin/verify", "", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.pin_code]);

  return (
    <div
      style={{ direction: "ltr" }}
      className="text-black w-full flex items-center justify-center my-4"
    >
      <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full py-5 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img alt="" width={260} className="mx-auto site-logo" />
        <h1 className="text-3xl text-center font-semibold text-Pink mb-4">
          {content.EnterPin || "Enter your PIN"}
        </h1>

        <div className="flex flex-col items-center gap-3 my-4">
          <OTPInput
            value={pin}
            onChange={(v) => setPin(v.replace(/\D/g, "").slice(0, 4))}
            numInputs={4}
            inputType="password"
            inputStyle="!w-10 border border-black rounded-xl h-12 w-12 mx-2 px-3 text-center"
            renderInput={(props) => (
              <input
                {...props}
                autoFocus={true}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            )}
          />
        </div>

        {loading ? <Loading /> : ""}
        <div className="text-red-600 text-center">{error}</div>

        <div className="text-center mt-4">
          <Link to="/forget-pin" className="underline text-Pink">
            {content.ForgetPin || "Forgot PIN?"}
          </Link>
        </div>
        <div className="text-center mt-2">
          <button
            onClick={() => logout("logout")}
            className="underline text-gray-600"
          >
            {content.LogOut || "Log out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPin;
