import logo from "../images/IMG-20230702-WA0052-removebg.png";
import { BsInstagram, BsWhatsapp, BsFacebook } from "react-icons/bs";
import tiktok from "../images/tiktok.webp";
import icr from "../images/Group 226.png";
import { Link } from "react-router-dom";
import { Container } from "../components";
import { useContextTranslate } from "../Context/ContextAPI";
import { useFETCH } from "../Tools/APIs";

const Footer = () => {
  const { content } = useContextTranslate();
  const { data } = useFETCH(
    `contact-us/info?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  return (
    <>
      <footer className="py-3 ">
        <Container>
          <div className="flex justify-between max-sm:flex-col items-center">
            <div className=" ">
              <div>
                <img src={logo} alt="" className="mx-auto  w-[250px]" />
              </div>
              <div className="-mt-5  mx-auto px-4 w-full">
                <div className="icons  flex  justify-center gap-2 py-3 flex-wrap">
                  <a href={dataAll?.facebook} target="_blank">
                    <BsFacebook color="#1778F2" className="w-full h-full" />
                  </a>
                  <a href={dataAll?.instagram} target="_blank">
                    <BsInstagram color="#fff" />
                  </a>

                  <a
                    href={`whatsapp://send?phone=${dataAll?.whatsapp}`}
                    target="_blank"
                  >
                    <BsWhatsapp color="#fff" />
                  </a>

                  <a href={dataAll?.tiktok} target="_blank">
                    <img src={tiktok} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-1/3 max-sm:w-full max-sm:text-center">
              <h1 className="text-center text-3xl mb-5 font-bold">Links</h1>
              <div className="flex justify-between max-sm:flex-col ">
                <ul className="text-xl space-y-3 mt-3 font-semibold">
                  <li>
                    <Link to="/">{content.home}</Link>
                  </li>
                  <li>
                    <Link to="/about-us">{content.aboutUs}</Link>
                  </li>
                  <li>
                    <Link to="/products">{content.products}</Link>
                  </li>
                </ul>
                <ul className="text-xl space-y-3 mt-3 font-semibold">
                  <li>
                    <Link to="contact-us">{content.ContactUs}</Link>
                  </li>
                  {!localStorage.getItem("token") && (
                    <>
                      <li>
                        <Link to="/sign-in">{content.SignIn}</Link>
                      </li>
                      <li>
                        <Link to="/sign-up">{content.SignUp}</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center space-y-1 mt-5">
            <h1>Copyright @ 2023 . All Rights Reserved </h1>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
