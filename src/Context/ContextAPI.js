import React, { createContext, useContext, useEffect, useState } from "react";
import Translate from "./TranslateData.json";
import { useFETCH, usePOST } from "../Tools/APIs";
import { useLocation } from "react-router-dom";
const ContextAPI = createContext({});

window.localStorage.getItem("language")
  ? window.localStorage.getItem("language")
  : window.localStorage.setItem("language", "en");

const ContextProvider = ({ children }) => {
  const [translat, setTranslat] = useState(
    window.localStorage.getItem("language")
  );
  const [content, setContent] = useState({});
  const [numberCode, setNumberCode] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem("language") === "ar") {
      document.body.style.direction = "rtl";
      setContent(Translate.ar);
    }
    if (window.localStorage.getItem("language") === "en") {
      document.body.style.direction = "ltr";
      setContent(Translate.en);
    }
  }, [translat, content]);
  const { setFormData, handleSubmit, formData } = usePOST({});

  const changeLanguage = () => {
    setTranslat("ar");
    setFormData({
      ...formData,
      locale: "ar",
    });
    window.localStorage.setItem("language", "ar");
  };
  const changeLanguage2 = () => {
    setTranslat("en");
    setFormData({
      ...formData,
      locale: "en",
    });
    window.localStorage.setItem("language", "en");
  };
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      handleSubmit("change/locale", "", "", false);
    }
  }, [formData]);

  const { pathname } = useLocation();
  const [test, setTest] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setTest(pathname);
  }, [pathname]);

  const {
    data,
    reCallUrl: profile_reCallUrl,
    prevUrl: profile_prevUrl,
  } = useFETCH(localStorage.getItem("token") ? `profile?test=${test}` : "");
  useEffect(() => {
    setProfile(data?.data.data);
  }, [data]);
  const [getProfile, setGetProfile] = useState(false);

  useEffect(() => {
    if (profile_prevUrl) {
      profile_reCallUrl(prevUrl);
      console.log("hussein2");
    }
    console.log("hussein1");
  }, [getProfile]);

  const [page, setPage] = useState(1);
  const [relod, setRelod] = useState(false);
  const {
    data: dataProducts,
    reCallUrl,
    prevUrl,
  } = useFETCH(
    `products?paginate=30&local=${localStorage.getItem(
      "language"
    )}&page=${page}`
  );
  useEffect(() => {
    if (prevUrl) {
      setPage(1);
      reCallUrl(prevUrl);

      console.log("hussein2");
    }
    console.log("hussein1");
  }, [relod]);

  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   if (dataProducts?.data.data.length > 0) {
  //     setProducts((prevProducts) => [
  //       ...prevProducts,
  //       ...dataProducts?.data.data,
  //     ]);
  //   }
  //   console.log("newss");
  //   console.log("data", dataProducts?.data.data);
  //   console.log("products", products);
  //   console.log("page", page);
  // }, [dataProducts?.data.data, page]);

  useEffect(() => {
    if (!dataProducts) return;

    const newItems = dataProducts.data?.data ?? [];

    if (newItems.length === 0) return;
    if(page === 1){
      setProducts(newItems);
      return;
    }

    setProducts((prev) => {
      const ids = new Set(prev.map((item) => item.id));
      const filtered = newItems.filter((item) => !ids.has(item.id));
      return [...prev, ...filtered];
    });
  }, [dataProducts]);

  useEffect(() => {
    // this for auto update the locale of the current users .
    if (
      profile?.locale &&
      profile?.locale?.toLowerCase() != window.localStorage.getItem("language")
    ) {
      window.localStorage.setItem("language", profile?.locale?.toLowerCase());
      setTranslat(localStorage.getItem("language"));
    }
  }, [profile]);

  return (
    <ContextAPI.Provider
      value={{
        showPopUp,
        setShowPopUp,
        content,
        changeLanguage,
        changeLanguage2,
        profile,
        page,
        setPage,
        dataProducts,
        products,
        numberCode,
        setNumberCode,
        setTest,
        relod,
        setRelod,
        getProfile,
        setGetProfile,
      }}
    >
      {children}{" "}
    </ContextAPI.Provider>
  );
};

export default ContextProvider;

export const useContextTranslate = () => {
  return useContext(ContextAPI);
};
