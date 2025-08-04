import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi"; // Copy icon
import { baseUrl } from "../../Tools/APIs";
import { IoMdSync } from "react-icons/io";

function generateToken() {
  const random = Math.random().toString(36).substring(2, 15);
  const token = `5206|${random + Date.now().toString(36)}`;
  return token;
}

function TokenModal({ open, onClose, user }) {
  const [token, setToken] = useState("");
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [spinning, setSpinning] = useState(false);

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setToken(user.token);
      setIpWhitelist(user.ip_whitelist);
    }
  }, [open]);

  const handleGenerate = () => {
    setSpinning(true);
    const newToken = generateToken();
    setToken(newToken);
    setTimeout(() => {
      setSpinning(false);
    }, 1000); // or however long your process takes
  };

  const handleSave = () => {
    setLoading(true);

    // Get the auth token from wherever it's stored (e.g., localStorage, sessionStorage, etc.)
    const authtoken = localStorage.getItem("token");

    axios
      .post(
        baseUrl + "user/token",
        { token: token, ip_whitelist: ipWhitelist },
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      )
      .then(() => {
        alert("Token saved successfully!");
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        alert("Error saving token");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm relative">
        <h2 className="text-lg font-semibold mb-4">Token</h2>

        <div className="flex justify-between gap-2">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full border p-2 pr-10"
              value={token}
              readOnly
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-2 text-gray-500 hover:text-black"
              title="Copy"
            >
              <FiCopy size={20} />
            </button>
          </div>
          <button
            onClick={handleGenerate}
            className="bg-gray-200 px-4 py-2 rounded-md"
          >
            <IoMdSync
              size={20}
              className={spinning ? "animate-spin transition-transform" : ""}
            />
          </button>
        </div>
        {copied && <div className="text-sm text-green-600 mt-1">Copied!</div>}

        <div className="flex justify-between mt-4"></div>

        <label for="message" class="block mb-2">
          IP Whitelist
        </label>
        <textarea
          rows={4}
          value={ipWhitelist}
          onChange={(e) => setIpWhitelist(e.target.value)}
          class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
          placeholder="Enter one IP per line"
        ></textarea>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TokenModal;
