import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./layout/index";
import Swal from "sweetalert2";
import { onMessage } from "firebase/messaging";

import {
  AboutUs,
  ChargingWallet,
  Code,
  Contact,
  ForgetPassword,
  Home,
  Products,
  ProductsFive,
  ApiProducts,
  ApiProductsPackage,
  ProductsFour,
  ProductsOne,
  ProductsThree,
  ProductsTwo,
  Request,
  SecProductsOne2,
  SetPassword,
  ShippingPayments,
  ShippingPayments2,
  Sign,
  SignUp,
  Wallet,
  Wallet2,
  Requests,
  Notifications,
  Search,
  SmsNumber,
  GroupProducts,
} from "./pages/index";
import Navbar2 from "./layout/Navbar2";
import { BsWhatsapp } from "react-icons/bs";
import { RequireAuth, useFETCH } from "./Tools/APIs";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import { useContextTranslate } from "./Context/ContextAPI";
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const App = () => {
  const { getProfile, setGetProfile } = useContextTranslate();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data } = useFETCH(
    `contact-us/info?local=${localStorage.getItem("language")}`
  );
  async function requestPermission() {
    // Detect iOS (Safari, Chrome, Edge, Firefox – all browsers on iOS use WebKit)

    if (isIOS) {
      console.warn("🚫 Firebase Messaging is not supported on iOS browsers.");
      return;
    }
    console.log("requestPermission");
    const prem = await Notification.requestPermission();
    console.log({ prem });
    if (prem === "granted") {
      const fcm_token = await getToken(messaging, {
        vapidKey:
          "BONx2o6NAkyiVasHiM-i1jM4yGGD8WaOdVKULD9cAWIbP_1xkL9JcSPy3qMuLUDnGbuiCc0A5lpwMxPL0C43meQ",
      });
      console.log("FCM Token: ", fcm_token);
      sessionStorage.setItem("fcm_token", fcm_token);
    } else if (prem === "denied") {
      console.log("denied");
    }
  }

  useEffect(() => {
    if (!isIOS) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("🔥 Service Worker Registered:", registration);
          })
          .catch((error) => {
            console.error("❌ Service Worker Registration Failed:", error);
          });
      }
    }
    requestPermission();
  }, []);
  if (!isIOS) {
    onMessage(messaging, (payload) => {
      console.log("📩 TEST Foreground Notification Received:", payload);

      if (!payload.notification) {
        console.log("🚨 Payload missing notification object", payload);
        return;
      }

      // alert("Test");

      setGetProfile(!getProfile);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.png",
      });

      console.log("✅ Foreground Notification Displayed");
    });
  }

  useEffect(() => {
    if(!isIOS) {
    console.log("🔄 Checking Notification Permissions...");

    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("✅ Notification Permission Granted");
        } else {
          console.warn("🚫 Notification Permission Denied");
        }
      })
      .catch((err) => console.error("🚨 Error requesting permission:", err));
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      Swal.fire({
        icon: "success",
        title: "Online",
        text: "You are online!",
        timer: 2000,
        timerProgressBar: true,
      });
    };

    const handleOffline = () => {
      Swal.fire({
        icon: "error",
        title: "Offline",
        text: "You are offline!",
        timer: 2000,
        timerProgressBar: true,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="relative ov">
      <NavBar />
      <Navbar2 />
      <div className="fixed bottom-10 right-10 z-50">
        <a
          href={`whatsapp://send?phone=${data?.data.data.whatsapp}`}
          target="_blank"
        >
          <BsWhatsapp
            color="#fff"
            className="bg-[#25D366] p-2 rounded-full w-12 h-12  "
          />
        </a>
      </div>
      <div className="bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route element={<RequireAuth />}>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="products-1/:id" element={<ProductsOne />} />
              <Route
                path="products-1/packages/:id"
                element={<SecProductsOne2 />}
              />
              <Route path="products-2/:id" element={<ProductsTwo />} />
              <Route path="products-3/:id" element={<ProductsThree />} />
              <Route path="products-4/:id" element={<ProductsFour />} />
              <Route path="products-5/:id" element={<ProductsFive />} />
              <Route path="products-6/:id" element={<ApiProducts />} />
              <Route path="products-7/:id" element={<GroupProducts />} />

              <Route
                path="products-6/packages/:id"
                element={<ApiProductsPackage />}
              />
            </Route>
          </Route>
          <Route path="Contact-us" element={<Contact />} />
          <Route path="wallet">
            <Route index element={<Wallet />} />
            <Route path=":id" element={<Wallet2 />} />
          </Route>
          <Route path="Orders">
            <Route index element={<Requests />} />
            <Route path=":id" element={<Request />} />
          </Route>
          <Route path="shipping-payments">
            <Route index element={<ShippingPayments />} />
            <Route path=":id" element={<ShippingPayments2 />} />
          </Route>
          <Route path="charging-the-wallet" element={<ChargingWallet />} />
          <Route path="search" element={<Search />} />
          <Route path="sign-in" element={<Sign />} />
          <Route path="sign-in/code" element={<SmsNumber sign={true} />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-up/code" element={<SmsNumber />} />
          <Route path="verification-code" element={<Code />} />
          <Route path="set-password" element={<SetPassword />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="Notifications" element={<Notifications />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
