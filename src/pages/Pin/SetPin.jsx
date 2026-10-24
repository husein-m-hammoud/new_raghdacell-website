import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";

const SetPin = () => {
  const { content } = useContextTranslate();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [localError, setLocalError] = useState("");
  const { handleSubmit, error, loading, setFormData, dataPlayer } = usePOST({});

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

  const handleSubmitMain = (e) => {
    e.preventDefault();
    if (pin.length !== 4) {
      setLocalError("PIN must be 4 digits");
      return;
    }
    if (pin !== confirmPin) {
      setLocalError("PINs do not match");
      return;
    }
    setLocalError("");
    handleSubmit("pin/set", "", true);
  };

  return (
    <div
      style={{ direction: "ltr" }}
      className="text-black w-full flex items-center justify-center my-4"
    >
      <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full py-5 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img alt="" width={260} className="mx-auto site-logo" />
        <h1 className="text-3xl text-center font-semibold text-Pink mb-4">
          {content.SetPin || "Set your PIN"}
        </h1>
        <p className="text-center mb-4 text-sm text-gray-600">
          {content.SetPinHint ||
            "Choose a 4-digit PIN. You'll enter it every time you open the website in a new tab."}
        </p>

        <div className="flex flex-col items-center gap-3 my-4">
          <span>{content.NewPin || "New PIN"}</span>
          <OTPInput
            value={pin}
            onChange={(v) => setPin(v.replace(/\D/g, "").slice(0, 4))}
            numInputs={4}
            inputType="password"
            inputStyle="!w-10 border border-black rounded-xl h-12 w-12 mx-2 px-3 text-center"
            renderInput={(props) => (
              <input {...props} inputMode="numeric" pattern="[0-9]*" />
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-3 my-4">
          <span>{content.ConfirmPin || "Confirm PIN"}</span>
          <OTPInput
            value={confirmPin}
            onChange={(v) => setConfirmPin(v.replace(/\D/g, "").slice(0, 4))}
            numInputs={4}
            inputType="password"
            inputStyle="!w-10 border border-black rounded-xl h-12 w-12 mx-2 px-3 text-center"
            renderInput={(props) => (
              <input {...props} inputMode="numeric" pattern="[0-9]*" />
            )}
          />
        </div>

        {loading ? <Loading /> : ""}
        <div className="text-red-600 text-center">{localError || error}</div>
        <button
          onClick={handleSubmitMain}
          className="w-3/4 block mx-auto py-3 bg-Pink text-white text-xl rounded-2xl mt-2"
        >
          {content.Save || "Save"}
        </button>
      </div>
    </div>
  );
};

export default SetPin;
