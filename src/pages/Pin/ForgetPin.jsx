import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { usePOST } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";

const ForgetPin = () => {
  const { content, profile } = useContextTranslate();
  const naviget = useNavigate();
  const { handleSubmit, error, loading, dataPlayer } = usePOST({});

  useEffect(() => {
    if (dataPlayer?.data?.code === 200) {
      naviget("/reset-pin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlayer?.data?.code]);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit("pin/send-reset-code", "", true);
  };

  return (
    <div className="text-black w-full flex items-center justify-center my-4" style={{ direction: "ltr" }}>
      <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full py-5 px-3 rounded-2xl md:w-1/3 w-full m-3">
        <img alt="" width={260} className="mx-auto site-logo" />
        <h1 className="text-3xl text-center font-semibold text-Pink mb-4">
          {content.ForgetPin || "Forgot PIN"}
        </h1>
        <p className="text-center mb-4 text-sm text-gray-600">
          {content.ForgetPinHint ||
            "We'll send a 4-digit code to your account email."}
        </p>
        <p className="text-center mb-4 font-semibold">{profile?.email}</p>

        {loading ? <Loading /> : ""}
        <div className="text-red-600 text-center">{error}</div>

        <button
          onClick={submit}
          className="w-3/4 block mx-auto py-3 bg-Pink text-white text-xl rounded-2xl mt-2"
        >
          {content.Send || "Send code"}
        </button>
      </div>
    </div>
  );
};

export default ForgetPin;
