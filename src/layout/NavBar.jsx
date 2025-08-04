import { Link, useLocation } from "react-router-dom";
import { Container, Currency, Search } from "../components/index";
import logo from "../images/logo.png";
import lob from "../images/Flag-of-Lebanon-4-623x467.png";
import eng from "../images/images.jpg";
import { useEffect, useState } from "react";
import { useContextTranslate } from "../Context/ContextAPI";
import { BsFillBellFill } from "react-icons/bs";
import { Col, Row } from "../Grid-system";
import PopupNot from "./PopupNot";
import UserP from "./UserP";
import { useClose, usePOST } from "../Tools/APIs";
import Switch from "react-switch";
const NavBar = () => {
  const { pathname } = useLocation();
  const { mouse, open, setOpen } = useClose();
  const [currency, setCurrency] = useState();
  const { setFormData, handleSubmit } = usePOST();
  const { content, changeLanguage, changeLanguage2, profile } =
    useContextTranslate();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    setFormData({
      currency: profile?.currency === "USD" ? "LBP" : "USD",
      locale: profile?.locale,
    });
    setCurrency(profile?.currency === "USD");
  }, [pathname,profile]);
  return (
    <div ref={mouse}>
      <nav className="shadow-md sticky top-0 left-0 z-30 w-full bg-white max-sm:hidden">
        <Container>
          <div className="flex justify-between items-center gap-2 ">
            <Link to="/" className=" max-md:py-2 max-sm:order-1 ">
              <img src={logo} alt="" width={75} />
            </Link>
            <Search />
            <div className="max-md:order-3 ">
              <ul className="flex gap-3 items-center">
                {localStorage.getItem("token") ? (
                  <>
                    <UserP />
                    <li className="p-2 h-10 cursor-pointer hover:bg-slate-300 border rounded-full flex justify-center font-semibold items-center gap-2">
                      <Link to="/wallet">
                        <span className="text-Pink">
                          {content.Balance} :{" "}
                          <Currency
                            number={profile?.balance}
                            currency={profile?.currency}
                          />
                        </span>
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setOpen(!open);
                      }}
                      className=" relative w-10 h-10 border cursor-pointer text-yellow-300 text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                    >
                      <BsFillBellFill size={30} className="" />
                      <div className="w-4 h-4 rounded-full bg-Pink flex justify-center items-center p-1 absolute -top-1 -right-0 text-white text-sm">
                        {profile?.new_notifications_count}
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="cursor-pointer bg-Pink font-semibold px-3 py-2 rounded-xl hover:bg-opacity-90 text-white">
                      <Link to="sign-up">{content.SignUp}</Link>
                    </li>
                    <li className="cursor-pointer bg-Pink font-semibold px-3 py-2 rounded-xl hover:bg-opacity-90 text-white">
                      <Link to="sign-in">{content.SignIn}</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <ul>
              {localStorage.getItem("language") === "en" ? (
                <li
                  onClick={changeLanguage}
                  className="w-20 h-10 border cursor-pointer text-Pink text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                >
                  <div className="w-7 h-7 mx-1 rounded-full overflow-hidden">
                    <img src={eng} alt="" className="rounded-full" />
                  </div>
                  EN
                </li>
              ) : (
                <li
                  onClick={changeLanguage2}
                  className="w-20 h-10 border cursor-pointer text-Pink text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                >
                  AR
                  <img src={lob} alt="" className="rounded-full w-10" />
                </li>
              )}
            </ul>

            <div style={{ direction: "ltr" }}>
              {localStorage.getItem("token") ? (
                <label className="flex items-center gap-1">
                  <div className="text-Pink font-semibold ">LBP</div>
                  <Switch
                    height={15}
                    uncheckedIcon
                    checkedIcon
                    offColor="#cab8b8"
                    onColor="#cab8b8"
                    offHandleColor="#e2304b"
                    onHandleColor="#e2304b"
                    activeBoxShadow="0 0 2px 3px #e2304b"
                    handleDiameter={22}
                    width={35}
                    onChange={() => {
                      setCurrency(profile?.currency === "USD" ? false : true);
                      setFormData({
                        currency: profile?.currency === "USD" ? "LBP" : "USD",
                      });
                      handleSubmit("change-currency", "", "", true);
                    }}
                    checked={currency}
                  />
                  <div className="text-Pink font-semibold ">USD</div>
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </nav>
      <nav className=" bg-white max-sm:block hidden">
        <Container>
          <Row className="items-center ">
            <Col sm={5} className="flex justify-between items-center  gap-1">
              <ul className="flex justify-end ">
                {localStorage.getItem("language") === "en" ? (
                  <li
                    onClick={changeLanguage}
                    className="w-20 h-10 border cursor-pointer text-Pink text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                  >
                    <div className="w-7 h-7 mx-1 rounded-full overflow-hidden">
                      <img src={eng} alt="" className="rounded-full" />
                    </div>
                    EN
                  </li>
                ) : (
                  <li
                    onClick={changeLanguage2}
                    className="w-20 h-10 border cursor-pointer text-Pink text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                  >
                    AR
                    <img src={lob} alt="" className="rounded-full w-10" />
                  </li>
                )}
              </ul>
              {!localStorage.getItem("token") ? (
                ""
              ) : (
                <div
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className=" relative w-10 h-10 border cursor-pointer text-yellow-300 text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                >
                  <BsFillBellFill size={30} className="" />
                  <div className="w-4 h-4 rounded-full bg-Pink flex justify-center items-center p-1 absolute -top-1 -right-0 text-white text-sm">
                    {profile?.new_notifications_count}
                  </div>
                </div>
              )}
            </Col>
            <Col sm={5}>
              <Link to="/" className="">
                <img src={logo} alt="" width={75} className="mx-auto" />
              </Link>
            </Col>
            <Col sm={5}>
              {localStorage.getItem("token") ? (
                <label
                  className="flex items-center gap-1"
                  style={{ direction: "ltr" }}
                >
                  <div className="text-Pink font-semibold ">USD</div>
                  <Switch
                    height={15}
                    uncheckedIcon
                    checkedIcon
                    offColor="#cab8b8"
                    onColor="#cab8b8"
                    offHandleColor="#e2304b"
                    onHandleColor="#e2304b"
                    activeBoxShadow="0 0 2px 3px #e2304b"
                    handleDiameter={22}
                    width={35}
                    onChange={() => {
                      handleSubmit("change-currency", "", "", true);
                    }}
                    checked={profile?.currency === "LBP"}
                  />
                  <div className="text-Pink font-semibold ">LBP</div>
                </label>
              ) : (
                <div
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className=" relative w-10 h-10 border cursor-pointer text-yellow-300 text-xl font-semibold  rounded-full flex items-center  hover:bg-slate-300  justify-center"
                >
                  <BsFillBellFill size={30} className="" />
                  <div className="w-4 h-4 rounded-full bg-Pink flex justify-center items-center p-1 absolute -top-1 -right-0 text-white text-sm">
                    {profile?.new_notifications_count}
                  </div>
                </div>
              )}
            </Col>
          </Row>
          <div className="flex justify-center py-2 -mt-3">
            <ul className="flex gap-3 items-center">
              {localStorage.getItem("token") ? (
                <>
                  <UserP />
                  <li className="p-2 h-10 cursor-pointer hover:bg-slate-300 border rounded-full flex justify-center font-semibold items-center gap-2">
                    <Link to="/wallet">
                      <span className="text-Pink">
                        {content.Balance} :
                        <Currency
                          number={profile?.balance}
                          currency={profile?.currency}
                        />
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="cursor-pointer bg-Pink font-semibold px-3 py-2 rounded-xl hover:bg-opacity-90 text-white">
                    <Link to="sign-up">{content.SignUp}</Link>
                  </li>
                  <li className="cursor-pointer bg-Pink font-semibold px-3 py-2 rounded-xl hover:bg-opacity-90 text-white">
                    <Link to="sign-in">{content.SignIn}</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Search />
        </Container>
      </nav>
      {open ? <PopupNot /> : ""}
    </div>
  );
};

export default NavBar;
