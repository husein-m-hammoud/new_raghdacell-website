import { useParams } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import { fileUrl, useFETCH, usePOST } from "../../Tools/APIs";
import {
  Container,
  Currency,
  Loading,
  PopUp,
  TitleTwo,
} from "../../components";
import { useEffect, useState } from "react";

const ProductsFour = () => {
  const { content, showPopUp, setShowPopUp, profile } = useContextTranslate();
  const { id } = useParams();
  const { data, isLoading } = useFETCH(
    `products/${id}?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  const {
    handleChangeInput,
    handleSubmit,
    formData,
    loading,
    error,
    setError,
    setFormData,
  } = usePOST({ product_id: id });
  const handleSubmitMain = (e) => {
    e.preventDefault();
    var goToOrders = '/Orders';

    if (formData.quantity < dataActive?.[0]?.minimum_qut) {
      setError(
        localStorage.getItem("language") === "en"
          ? "Quantity must be greater than or equal to " +
              dataActive?.[0]?.minimum_qut
          : `يجب أن تكون الكمية أكبر أو تساوي ${dataActive?.[0]?.minimum_qut}`
      );
    } else {
      handleSubmit(`orders?local=${localStorage.getItem("language")}`,goToOrders);
    }
  };
  const [active, setActive] = useState("");
  useEffect(() => {
    setActive(dataAll?.product_additional_services?.[0].type);
  }, [dataAll]);
  useEffect(() => {
    setFormData({
      ...formData,
      service_type: dataAll?.product_additional_services?.[0].type,
    });
  }, [dataAll]);

  let dataActive = dataAll?.product_additional_services?.filter(
    (e) => e.type === active
  );
  useEffect(() => {
    setFormData({
      ...formData,
      quantity: dataActive?.[0]?.minimum_qut,
    });
  }, [dataActive?.[0]?.minimum_qut]);
  return (
    <section className="py-3 font-semibold">
      <Container>
        {isLoading ? <Loading /> : ""}
        <TitleTwo title={dataAll?.name} />
        <div className="py-4 mt-4">
          <div className="flex justify-center gap-6 max-sm:flex-wrap">
            <div className="w-1/2 max-md:w-full">
              <img
                src={fileUrl + dataAll?.image}
                alt=""
                className="w-full object-cover rounded-3xl"
              />
            </div>
            <div className="w-1/2 max-md:w-full space-y-1">
              <div className="flex justify-center gap-3 py-5 text-center flex-wrap">
                {dataAll?.product_additional_services.map((e, i) => (
                  <div
                    key={i}
                    className={`${
                      active === e.type ? "border-Pink text-Pink" : ""
                    } border-2  order-2 py-3 w-[110px] cursor-pointer rounded-2xl font-semibold`}
                    onClick={() => {
                      setActive(e.type);
                      setFormData({
                        ...formData,
                        service_type: e.type,
                      });
                    }}
                  >
                    <h6 className="max-sm:text-[16px]">
                      {e.type === "LIKES"
                        ? content.Likes
                        : e.type === "COMMENTS"
                        ? content.Comments
                        : e.type === "VIEWS"
                        ? content.Views
                        : content.Followers}
                    </h6>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-5">
                <div className="w-full">
                  <span>{content.Quantity}</span>
                  <p>
                    <input
                      name="quantity"
                      min={dataActive?.[0]?.minimum_qut}
                      value={formData.quantity}
                      type="number"
                      onChange={handleChangeInput}
                      placeholder={dataActive?.[0]?.minimum_qut || "1234..."}
                      className={`${
                        formData.quantity < dataActive?.[0]?.minimum_qut
                          ? "shadow-md shadow-red-500 "
                          : ""
                      } py-5 px-4 border mt-3  border-[#707070] rounded-xl w-full outline-none`}
                    />
                    <h5 className="text-red-600">
                      {dataActive?.[0]?.minimum_qut_note
                        ? dataActive?.[0].minimum_qut_note
                        : ""}
                    </h5>
                  </p>
                </div>
                <div className="w-full ">
                  <span>{content.Total}</span>
                  <p className="bg-[#9A9A9A] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    <Currency
                      number={
                        formData?.quantity *
                          (profile?.type === "COMPANY"
                            ? +dataActive?.[0]?.company_price
                            : +dataActive?.[0]?.user_price) || 0
                      }
                    />
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <span>{content.SocialLink}</span>
                <input
                  type="text"
                  name="social_link"
                  value={formData.social_link}
                  onChange={handleChangeInput}
                  className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                  placeholder={content.EnterTheLink}
                />
              </div>
              <p className="text-red-600">
                {dataActive?.[0]?.note ? dataActive?.[0]?.note : ""}
              </p>
              <button
                onClick={() => setShowPopUp(true)}
                className="outline-none block w-2/3 mx-auto text-white text-xl   my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Purple hover:bg-opacity-90"
              >
                {content.Buy}
              </button>
              <div className="text-red-500 font-semibold text-center">
                {error}
              </div>

              {loading ? <Loading /> : ""}

              <PopUp
                loading={loading}
                showPopup={showPopUp}
                onClick={handleSubmitMain}
              >
                <div className="w-full ">
                  <span>{content.Quantity}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData?.quantity || 0}
                  </p>
                </div>
                <div className="w-full ">
                  <span>{content.Price}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    <Currency
                      number={
                        formData?.quantity *
                          (profile?.type === "COMPANY"
                            ? +dataActive?.[0]?.company_price
                            : +dataActive?.[0]?.user_price) || 0
                      }
                    />
                  </p>
                </div>
                <div className="w-full ">
                  <span>{content.SocialLink}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData.social_link}
                  </p>
                </div>
                <div className="text-red-500 font-semibold text-center">
                  {error}
                </div>
              </PopUp>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductsFour;
