import Money from "../../images/1200x630wa_clipdrop-background-removal.png";
import USDT from "../../images/886865-middle_clipdrop-background-removal.png";
import CODE from "../../images/istockphoto-1136155337-612x612.jpg";
import omt from "../../images/omt.webp";

import copyIcon from "../../images/Icon feather-copy.png";
import { Container, Currency, Loading, TitleTwo } from "../../components";
import { useContextTranslate } from "../../Context/ContextAPI";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import { useFETCH, usePOST } from "../../Tools/APIs";
import CopyBox from "./CopyBox"; // path depends on where you save the component
import USDTRecharge from "./USDTRecharge";

const ChargingWallet = () => {
  const { content, profile } = useContextTranslate();
  const [active, setActive] = useState("USDT");

  const [copied, setCopied] = useState({
    usdtTrc: false,
    usdtBep: false,
    omt: false,
    wish: false,
  });

  const usdtTrcRef = useRef();
  const usdtBepRef = useRef();
  const omtPayRef = useRef();
  const wishMoneyRef = useRef();

  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    setViewFile,
    viewFile,
    formData,
    loading,
    error,
  } = usePOST({});

  const { data } = useFETCH(
    `payments/info?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data?.data;

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      `charging-processes?local=${localStorage.getItem("language")}`
    );
  };

  useEffect(() => {
    setFormData({ ...formData, name: active });
  }, [active]);

  useEffect(() => {
    if (profile?.currency !== "USD") {
      setActive("WHISH_MONEY");
    }
  }, [profile?.currency]);

  const handleCopy = (refKey) => {
    let ref = {
      usdtTrc: usdtTrcRef,
      usdtBep: usdtBepRef,
      omt: omtPayRef,
      wish: wishMoneyRef,
    }[refKey];

    if (ref?.current) {
      navigator.clipboard.writeText(ref.current.textContent).then(() => {
        setCopied((prev) => ({ ...prev, [refKey]: true }));
        setTimeout(() => {
          setCopied((prev) => ({ ...prev, [refKey]: false }));
        }, 2000);
      });
    }
  };

  return (
    <div className="py-4 font-semibold">
      <Container>
        <TitleTwo title={content.ChargingTheWallet} />
        <div className="w-1/2 max-md:w-full mx-auto my-5 border border-Pink rounded-2xl p-5">
          <Row justify="center" className="gap-2 py-5 text-center mb-10">
            {profile?.currency === "USD" && (
              <PaymentMethodBox
                title="USDT"
                img={USDT}
                active={active}
                onClick={() => setActive("USDT")}
              />
            )}
            <PaymentMethodBox
              title="Whish Money"
              img={Money}
              active={active}
              value="WHISH_MONEY"
              onClick={() => setActive("WHISH_MONEY")}
            />
            <PaymentMethodBox
              title="OMT Pay"
              img={omt}
              active={active}
              value="OMT_PAY"
              onClick={() => setActive("OMT_PAY")}
            />
            <PaymentMethodBox
              title="Code"
              img={CODE}
              active={active}
              value="PROMO_CODE"
              onClick={() => setActive("PROMO_CODE")}
            />
          </Row>

          {active === "USDT" ? (
            <div className="space-y-5">
              <USDTRecharge />
            </div>
          ) : (
            <div className="space-y-5">
              {(active === "WHISH_MONEY" || active === "OMT_PAY") && (
                <>
                  {active === "OMT_PAY" && (
                    <>
                      <label>OMT PAY</label>
                      <CopyBox
                        ref={omtPayRef}
                        text={dataAll?.omt_pay_text || ""}
                        copied={copied.omt}
                        onCopy={() => handleCopy("omt")}
                      />
                    </>
                  )}

                  {active === "WHISH_MONEY" && (
                    <>
                      <label>Whish Money</label>
                      <CopyBox
                        ref={wishMoneyRef}
                        text={dataAll?.whish_money_text || ""}
                        copied={copied.wish}
                        onCopy={() => handleCopy("wish")}
                      />
                    </>
                  )}

                  <div>
                    <label>{content.TheValue}</label>
                    <input
                      type="number"
                      name="value"
                      value={formData.value || ""}
                      onChange={handleChangeInput}
                      placeholder={content.EntertheValuetobesent}
                      className="outline-none block w-full bg-slate-50 py-5 px-8 rounded-2xl"
                    />
                  </div>

                  <div>
                    <div>{content.Shippingvalue}</div>
                    <div className="w-full py-2 px-5 bg-slate-300 rounded-xl">
                      <Currency
                        number={
                          formData?.value -
                            formData?.value *
                              ((active === "USDT"
                                ? +dataAll?.usdt_tax_percentage
                                : active === "OMT_PAY"
                                ? +dataAll?.omt_pay_tax_percentage
                                : +dataAll?.whish_money_tax_percentage) /
                                100) || 0
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div>{content.UploadPhoto}</div>
                    <AddImage
                      name="image"
                      newImage={viewFile}
                      onChange={handleChangeInput}
                      title={content.Uploadthenotice}
                      clickDeleteImage={() => {
                        setViewFile("");
                        setFormData({ ...formData, image: "" });
                      }}
                    />
                    {loading && <Loading />}
                    <div className="text-red-500 font-semibold">{error}</div>
                  </div>
                </>
              )}

              {active === "PROMO_CODE" ? (
                <Code />
              ) : (
                <button
                  disabled={loading}
                  onClick={handleSubmitMain}
                  className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl cursor-pointer bg-Pink hover:bg-opacity-90"
                >
                  {content.Send}
                </button>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

const PaymentMethodBox = ({ title, img, active, onClick, value }) => {
  const key = value || title;
  return (
    <Col
      sm={3}
      md={3}
      onClick={onClick}
      className={`${
        active === key ? "shadow-lg shadow-Pink" : ""
      } border border-Purple p-1 flex flex-col justify-between cursor-pointer w-[150px] rounded-2xl font-semibold`}
    >
      <div className={`${title  == 'Code' ? '' : 'w-[60px]'} mx-auto`}>
        <img src={img} alt={title} className="mx-auto" />
      </div>
      <h6 className="max-sm:text-[16px]">{title}</h6>
    </Col>
  );
};

const Code = () => {
  const { content } = useContextTranslate();
  const { handleChangeInput, handleSubmit, formData, loading, error } = usePOST(
    {}
  );

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(`charging-processes?name=PROMO_CODE`);
  };

  return (
    <form onSubmit={handleSubmitMain}>
      <div>
        <input
          type="text"
          name="promo_code"
          value={formData?.promo_code || ""}
          onChange={handleChangeInput}
          placeholder={content.EnterCode}
          className="outline-none block w-full bg-slate-50 py-5 px-8 rounded-2xl"
        />
      </div>
      {loading && <Loading />}
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      <div>
        <button
          type="submit"
          className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl cursor-pointer bg-Pink hover:bg-opacity-90"
        >
          {content.Send}
        </button>
      </div>
    </form>
  );
};

export default ChargingWallet;
