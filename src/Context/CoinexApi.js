// coinexApi.js
import axios from "axios";
import CryptoJS from "crypto-js";

const ACCESS_ID = "50C0B2D60B6243419691D891606C1B4D";
const SECRET_KEY = "AFB982B5D4A319FC40DB8308AB069F5E16166AAFB601BCCF";
const BASE_URL = "https://api.coinex.com/v1";

// Helper to generate signature
function generateSignature(params) {
  const sortedKeys = Object.keys(params).sort();
  const queryString = sortedKeys.map(key => `${key}=${params[key]}`).join('&');
  return CryptoJS.HmacSHA256(queryString, SECRET_KEY).toString(CryptoJS.enc.Hex);
}

export const privateRequest = async (endpoint, params = {}) => {
  const tonce = Date.now();
  const fullParams = {
    ...params,
    access_id: ACCESS_ID,
    tonce,
  };

  const signature = generateSignature(fullParams);
  const headers = {
    Authorization: signature,
  };

  const urlParams = new URLSearchParams(fullParams).toString();
  const url = `${BASE_URL}${endpoint}?${urlParams}`;

  return axios.get(url, { headers });
};

// Public request example
export const publicRequest = async (endpoint, params = {}) => {
  const urlParams = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}?${urlParams}`;
  return axios.get(url);
};
