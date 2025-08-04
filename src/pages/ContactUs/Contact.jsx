import React from "react";
import { Container, Loading, Title, TitleTwo } from "../../components";
import email from "../../images/Icon zocial-email.png";
import phone from "../../images/Icon awesome-phone-alt.png";
import { BsInstagram, BsWhatsapp, BsFacebook } from "react-icons/bs";
import tiktok from "../../images/tiktok.webp";
import { ImLocation } from "react-icons/im";
import { useContextTranslate } from "../../Context/ContextAPI";
import { useFETCH, usePOST } from "../../Tools/APIs";

const Contact = () => {
  const { content } = useContextTranslate();
  const { handleChangeInput, handleSubmit, loading, error } = usePOST({});
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("messages", "", "", true);
  };
  const { data, isLoading } = useFETCH(
    `contact-us/info?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  return (
    <section className="py-4 h-[]">
      <Container>
        <Title title={content.ContactUs} />
        <div className="flex max-lg:flex-col justify-start items-center gap-5">
          <div className="w-1/2 max-lg:w-full max-lg:order-2">
            <TitleTwo title={content.GetInTouch} />
            <input
              type="text"
              name="name"
              placeholder={content.name}
              onChange={handleChangeInput}
              className="outline-none block w-full border border-Pink bg-slate-50 my-5 py-5 px-8 rounded-3xl"
            />
            <input
              type="text"
              name="phone_number"
              placeholder={content.Phone}
              onChange={handleChangeInput}
              className="outline-none block w-full border border-Pink bg-slate-50 my-5 py-5 px-8 rounded-3xl"
            />
            <textarea
              type="text"
              name="message"
              placeholder={content.Message}
              onChange={handleChangeInput}
              className="outline-none block w-full border border-Pink bg-slate-50 my-5 py-5 px-8 rounded-3xl h-[260px]"
            />
            {isLoading ? <Loading /> : ""}
            {loading ? <Loading /> : ""}
            <div className="text-red-600">{error}</div>
            <button
              type="submit"
              onClick={handleSubmitMain}
              className="outline-none block w-2/3 mx-auto text-white text-xl   my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Purple hover:bg-opacity-90"
            >
              {content.Send}
            </button>
          </div>
          <div className=" w-1/2 max-lg:w-full mt-2 max-lg:order-1">
            <div className="py-5 px-4 border-2 rounded-xl my-3 border-Pink  flex items-center">
              <img src={email} alt="" />
              <div className="text-xl mx-2  break-all">{dataAll?.email}</div>
            </div>
            <div className="flex justify-center max-sm:flex-wrap md:gap-7">
              <div className="py-5 px-4 border-2 rounded-xl my-3 border-Pink flex items-center w-full">
                <img src={phone} alt="" />
                <div className=" mx-2">{dataAll?.first_phone_number}</div>
              </div>
              <div className="py-5 px-4 border-2 rounded-xl my-3 border-Pink flex items-center w-full">
                <ImLocation size={35} className="text-3xl text-Pink" />
                <div className=" mx-2">{dataAll?.second_phone_number}</div>
              </div>
            </div>
            <div className="py-5 px-4 border-2 rounded-xl my-3 border-Pink ">
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
                  <img src={tiktok} width="150px" height={25} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
