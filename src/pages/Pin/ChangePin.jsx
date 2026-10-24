import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";

const ChangePin = () => {
  const { content } = useContextTranslate();
  const naviget = useNavigate();
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);
  const { handleSubmit, error, loading, setFormData, dataPlayer } = usePOST({});

  useEffect(() => {
    if (dataPlayer?.data?.code === 200) {
      setSuccess(true);
      setTimeout(() => naviget("/"), 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlayer?.data?.code]);

  useEffect(() => {
    setFormData({ old_pin_code: oldPin, pin_code: newPin });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldPin, newPin]);

  const submit = (e) => {
    e.preventDefault();
    if (oldPin.length !== 4 || newPin.length !== 4) {
      setLocalError("PINs must be 4 digits");
      return;
    }
    if (newPin !== confirmPin) {
      setLocalError("New PINs do not match");
      return;
    }
    setLocalError("");
    handleSubmit("pin/change", "", true);
  };

  return (
    <div className="text-black w-full flex items-center justify-center my-4" style={{ direction: "ltr" }}>
      <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full py-5 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img alt="" width={260} className="mx-auto site-logo" />
        <h1 className="text-3xl text-center font-semibold text-Pink mb-4">
          {content.ChangePin || "Change PIN"}
        </h1>

        <div className="flex flex-col items-center gap-2 my-3">
          <span>{content.CurrentPin || "Current PIN"}</span>
          <OTPInput
            value={oldPin}
            onChange={(v) => setOldPin(v.replace(/\D/g, "").slice(0, 4))}
            numInputs={4}
            inputType="password"
            inputStyle="!w-10 border border-black rounded-xl h-12 w-12 mx-2 px-3 text-center"
            renderInput={(props) => (
              <input {...props} inputMode="numeric" pattern="[0-9]*" />
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-2 my-3">
          <span>{content.NewPin || "New PIN"}</span>
          <OTPInput
            value={newPin}
            onChange={(v) => setNewPin(v.replace(/\D/g, "").slice(0, 4))}
            numInputs={4}
            inputType="password"
            inputStyle="!w-10 border border-black rounded-xl h-12 w-12 mx-2 px-3 text-center"
            renderInput={(props) => (
              <input {...props} inputMode="numeric" pattern="[0-9]*" />
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-2 my-3">
          <span>{content.ConfirmPin || "Confirm new PIN"}</span>
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
        {success ? (
          <div className="text-green-600 text-center">
            {content.Saved || "PIN updated"}
          </div>
        ) : (
          <div className="text-red-600 text-center">{localError || error}</div>
        )}

        <button
          onClick={submit}
          className="w-3/4 block mx-auto py-3 bg-Pink text-white text-xl rounded-2xl mt-2"
        >
          {content.Save || "Save"}
        </button>

        <div className="text-center mt-3">
          <Link to="/forget-pin" className="underline text-Pink">
            {content.ForgetPin || "Forgot PIN?"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePin;
