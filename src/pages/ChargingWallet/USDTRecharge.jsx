import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import CopyBox from "./CopyBox"; // adjust path as needed
import { baseUrl } from "../../Tools/APIs";
import { useContextTranslate } from "../../Context/ContextAPI";

const USDTRecharge = () => {
  const { content } = useContextTranslate();
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("trc20");
  const [walletAddress, setWalletAddress] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [uniqueAmount, setUniqueAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const requestPayment = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    setError("");
    try {
      const res = await axios.post(
        `${baseUrl}wallet/request-payment`,
        { amount: parseFloat(amount), network },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWalletAddress(res.data.wallet_address);
      setQrCodeUrl(res.data.qr_code_url);
      setPaymentId(res.data.payment_id);
      setUniqueAmount(res.data.unique_amount);
      setStatus(content.WaitingForPayment);
     
      setChecking(true);
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Error requesting payment");
    }
  };

  // Payment status checker
  useEffect(() => {
    if (!checking || !paymentId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${baseUrl}wallet/check-payment/${paymentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.paid) {
          clearInterval(interval);
          setStatus(content.PaymentConfirmed);
          setChecking(false);
        }
      } catch (error) {
        console.error(error);
        setStatus(content.ErrorCheckingPaymentStatus);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [checking, paymentId]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "address") {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        setCopiedAmount(true);
        setTimeout(() => setCopiedAmount(false), 2000);
      }
    });
  };

  return (
    <div className="mx-auto  p-4 border border-gray-300 rounded-xl">
      <h3 className="text-center text-xl font-bold">{content.RechargeWithUSDT}</h3>

      <div className="my-4">
        <label>{content.AmountUSD}:</label>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={content.EnterAmount}
          className="outline-none block w-full bg-slate-50 py-3 px-5 rounded-2xl"
        />
      </div>

      <div className="mb-4">
        <label>{content.SelectNetwork}</label>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="outline-none block w-full bg-slate-50 py-3 px-5 rounded-2xl"
        >
          <option value="trc20">TRC20 (Tron)</option>
          <option value="bep20">BEP20 (BSC)</option>
        </select>
      </div>

      <button
        onClick={requestPayment}
        disabled={!amount}
        className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl cursor-pointer bg-Pink hover:bg-opacity-90"
      >
        {content.RequestPayment}
      </button>

      {error && (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      )}

      {/* ✅ Modal-style container for QR, address, amount */}
      {walletAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div class="bg-white rounded-3xl p-6 text-center w-[95%] md:w-[40%] mx-auto">
            <h4 className="text-lg font-semibold mb-3">{content.SendUSDTTo}</h4>

            <CopyBox
              text={walletAddress}
              copied={copiedAddress}
              onCopy={() => handleCopy(walletAddress, "address")}
            />

            <div className="my-5  flex justify-center">
              <QRCode value={qrCodeUrl} size={200} />
            </div>

            <h4 className="text-lg font-semibold mb-3 mt-4 flex items-center gap-2 relative group">
              {content.ExactAmountToPay}
              <span className="text-gray-500 cursor-pointer">ℹ️</span>
              <div className="absolute top-full left-0 mt-1 w-64 p-2 text-sm bg-black text-white rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {content.MustPayExactAmount}
              </div>
            </h4>

            <CopyBox
              text={`$${uniqueAmount}`}
              copied={copiedAmount}
              onCopy={() => handleCopy(uniqueAmount, "amount")}
            />

            <p className="mt-3 text-sm text-gray-600">{status}</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  setWalletAddress("");
                  setStatus("");
                  setChecking(false);
                }}
                className="bg-gray-400 text-white px-6 py-2 rounded-full"
              >
                {content.Close}
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-green-500 text-white px-6 py-2 rounded-full"
              >
                {content.Done}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default USDTRecharge;
