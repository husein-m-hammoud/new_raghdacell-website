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
import { useEffect } from "react";

const ProductsFive = () => {
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

    if (formData.quantity < dataAll?.minimum_qut) {
      setError(
        localStorage.getItem("language") === "en"
          ? "Quantity must be greater than or equal to " + dataAll?.minimum_qut
          : `يجب أن تكون الكمية أكبر أو تساوي ${dataAll?.minimum_qut}`
      );
    } else {
      handleSubmit(`orders?local=${localStorage.getItem("language")}`,goToOrders);
    }
  };
  useEffect(() => {
    setFormData({
      ...formData,
      quantity: dataAll?.minimum_qut,
    });
  }, [dataAll]);
  return (
    <section className="py-3 font-semibold ">
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
              <div className="flex justify-center gap-5">
                <div className="w-full">
                  <span>{content.Quantity}</span>
                  <p>
                    <input
                      type="number"
                      name="quantity"
                      min={dataAll?.minimum_qut}
                      value={formData.quantity}
                      onChange={handleChangeInput}
                      placeholder={dataAll?.minimum_qut || "1234..."}
                      className={`${
                        formData.quantity < dataAll?.minimum_qut
                          ? "shadow-md shadow-red-500 "
                          : ""
                      } py-5 px-4 border mt-3  border-[#707070] rounded-xl w-full outline-none`}
                    />
                    <h5 className="text-red-600">
                      {dataAll?.minimum_qut_note
                        ? dataAll?.minimum_qut_note
                        : ""}
                    </h5>
                  </p>
                </div>
                <div className="w-full ">
                  <span>{content.Total}</span>
                  {formData?.quantity > 100 ? (
                    <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                      <Currency
                        number={
                          formData?.quantity *
                            (profile?.type === "COMPANY"
                              ? +dataAll?.sec_company_price
                              : +dataAll?.sec_user_price) || 0
                        }
                      />
                    </p>
                  ) : (
                    <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                      <Currency
                        number={
                          formData?.quantity *
                            (profile?.type === "COMPANY"
                              ? +dataAll?.company_price
                              : +dataAll?.user_price) || 0
                        }
                      />
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <span>{content.WalletAddress}</span>
                <input
                  type="text"
                  name="wallet_address"
                  value={formData.wallet_address}
                  onChange={handleChangeInput}
                  className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                  placeholder={content.EnterTheAddress}
                />
              </div>
              <p className="text-red-600">
                {dataAll?.note ? dataAll?.note : ""}
              </p>
              <button
                onClick={() => setShowPopUp(true)}
                className="outline-none block w-2/3 mx-auto text-white text-xl   my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Purple hover:bg-opacity-90"
              >
                {content.Buy}
              </button>
              <div className="text-red-500 font-semibold">{error}</div>
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
                  {formData?.quantity > 100 ? (
                    <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                      <Currency
                        number={
                          formData?.quantity *
                            (profile?.type === "COMPANY"
                              ? +dataAll?.sec_company_price
                              : +dataAll?.sec_user_price) || 0
                        }
                      />
                    </p>
                  ) : (
                    <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                      <Currency
                        number={
                          formData?.quantity *
                            (profile?.type === "COMPANY"
                              ? +dataAll?.company_price
                              : +dataAll?.user_price) || 0
                        }
                      />
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <span>{content.WalletAddress}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData.wallet_address}
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

export default ProductsFive;
