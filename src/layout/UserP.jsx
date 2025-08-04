import React, { useEffect, useRef, useState } from "react";
import { BiUser } from "react-icons/bi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useContextTranslate } from "../Context/ContextAPI";
import { logout, usePOST } from "../Tools/APIs";
import { TokenModal } from "../components";

const UserP = () => {
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sure, setSure] = useState(false);
  const [show, setShow] = useState(false);
  const { content, profile } = useContextTranslate();
  const mouse = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (mouse.current) {
        if (!mouse.current.contains(e.target)) {
          setShow(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.addEventListener("mousedown", handler);
    };
  }, []);
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  return (
    <>
      <li
        ref={mouse}
        className="p-2 h-10 cursor-pointer hover:bg-slate-300 border rounded-full flex justify-center font-semibold items-center gap-2"
        onClick={() => {
          setShow(!show);
        }}
      >
        <BiUser size={25} className=" " />
        <span className="text-Pink">{profile?.username}</span>
        <div
          className={` ${
            !show
              ? ""
              : localStorage.getItem("language") === "en"
              ? "popup-profile "
              : "popup-left "
          }
         ${
           localStorage.getItem("language") === "en"
             ? "-right-full"
             : "-left-full "
         }
       fixed  transition-all top-20 w-[220px] max-sm:top-32  `}
          style={{ zIndex: "666" }}
        >
          <div className="navs bg-white  shadow-xl text-Pink text-center px-4 py-4 rounded-3xl ">
            <div className="">
              <NavLink to="wallet">
                <div className="px-3 py-2 hover:bg-Pink mb-1 hover:text-white rounded-xl p-1 font-semibold">
                  {content.Wallet}
                </div>
              </NavLink>
              <NavLink to="Orders">
                <div className="px-3 py-2 hover:bg-Pink mb-1 hover:text-white rounded-xl p-1 font-semibold">
                  {content.Orders}
                </div>
              </NavLink>
              <NavLink to="charging-the-wallet">
                <div className="px-3 py-2 hover:bg-Pink mb-1 hover:text-white rounded-xl p-1 font-semibold">
                  {content.ChargingTheWallet}
                </div>
              </NavLink>
              {profile?.type === "COMPANY" && (
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                >
                  <div className="px-3 py-2 hover:bg-Pink mb-1 hover:text-white rounded-xl p-1 font-semibold bg-white text-Pink ">
                    {content.Token}
                  </div>
                </NavLink>
              )}
              <NavLink to="shipping-payments">
                <div className="px-3 py-2 hover:bg-Pink mb-1 hover:text-white rounded-xl p-1 font-semibold">
                  {content.ShippingPayments}
                </div>
              </NavLink>

              <div
                onClick={() => setSure(true)}
                className="px-3 cursor-pointer  py-2 hover:bg-Pink hover:text-white rounded-xl p-1 font-semibold"
              >
                {content.LogOut}
              </div>
            </div>
          </div>
        </div>
      </li>
      {sure && (
        <>
          <div
            onClick={() => setSure(false)}
            className={` fixed w-full  h-full top-0 left-0 bg-white bg-opacity-40 z-50 flex justify-center items-center`}
          ></div>
          <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white z-[60] rounded-3xl max-sm:w-[90%] max-w-[500px] min-h-[200px] shadow-2xl">
            <p className="font-semibold text-3xl text-center py-7">
              {content.Areyousuretologout}
            </p>
            <div className="flex items-end m-5">
              <Link to="/sign-in" onClick={() => logout("logout")}>
                <div className="cursor-pointer bg-Pink font-semibold  p-3 px-10 rounded-xl hover:bg-opacity-90 text-white">
                  {content.Yes}
                </div>
              </Link>
              <button
                onClick={() => setSure(false)}
                className=" border px-10 border-Brown text-Brown bg-white font-semibold  p-3 rounded-xl ml-5"
              >
                {content.No}
              </button>
            </div>
          </div>
        </>
      )}
      <TokenModal
        open={isModalOpen}
        user={profile}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UserP;
