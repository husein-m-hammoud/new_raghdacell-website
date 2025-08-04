import { useParams } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import {
  Container,
  Currency,
  Loading,
  PopUp,
  TitleTwo,
} from "../../components";
import { fileUrl, useFETCH, usePOST } from "../../Tools/APIs";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";

const ProductsThree = () => {
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
  const {
    handleSubmit: handleSubmitPlayer,
    dataPlayer,
    loading: loadingPlayer,
  } = usePOST({});
  const [checkNumber, setCheckNumber] = useState("");
  const handleSubmitMain = (e) => {
    e.preventDefault();
    var goToOrders = '/Orders';
    if (dataAll?.th_party_api_id) {
      if (
        dataPlayer?.data?.data?.username &&
        formData?.player_number === checkNumber
      ) {
        handleSubmit(
          `orders?local=${localStorage.getItem("language")}&player_name=` +
            dataPlayer?.data?.data?.username,goToOrders
        );
      } else {
        setError(
          localStorage.getItem("language") === "en"
            ? "The player number must be correct."
            : "يجب ان يكون رقم اللاعب صحيح"
        );
      }
    } else if (formData.quantity < dataAll?.minimum_qut) {
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
  useEffect(() => {
    if (dataPlayer?.data?.data?.username) {
      setCheckNumber(formData?.player_number);
    }
  }, [dataPlayer?.data?.data?.username]);
  return (
    <section className="py-3 font-semibold">
      <Container>
        {isLoading ? <Loading /> : ""}
        <TitleTwo title={dataAll?.name} />
        <div className="py-4 mt-4">
          <div className="flex justify-center gap-6  max-sm:flex-wrap">
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
                      placeholder={content.EnterTheNumber}
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
                <div className="w-full">
                  <span>{content.Total}</span>
                  <p className="bg-[#9A9A9A] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    <Currency
                      number={
                        formData?.quantity *
                          (profile?.type === "COMPANY"
                            ? +dataAll?.company_price
                            : +dataAll?.user_price) || 0
                      }
                    />
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <span>{content.E_mailOrPhoneNumber}</span>
                <input
                  type="text"
                  name="email_or_phone_number"
                  value={formData.email_or_phone_number}
                  onChange={handleChangeInput}
                  className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                  placeholder={content.EnterEmailOrPhoneNumber}
                />
              </div>
              <div className="flex flex-col">
                <span>{content.PasswordOptional}</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChangeInput}
                  className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                  placeholder={content.EnterThePassword}
                />
              </div>
              <div className="flex flex-col">
                <span>{content.ContactNumber}</span>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChangeInput}
                  className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                  placeholder={content.EnterCntactNumber}
                />
              </div>
              {dataAll?.require_player_number === 1 && (
                <div className="flex flex-col">
                  <span>{content.PlayerNumber}</span>
                  <input
                    type="text"
                    name="player_number"
                    value={formData?.player_number}
                    onChange={handleChangeInput}
                    className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                    placeholder={content.EnterThePlayerNumber}
                  />
                </div>
              )}
              {dataAll?.th_party_api_id && !dataAll?.require_player_number && (
                <>
                  <div className="flex flex-col">
                    <span>{content.PlayerNumber}</span>
                    <input
                      type="text"
                      name="player_number"
                      value={formData?.player_number}
                      onChange={handleChangeInput}
                      className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                      placeholder={content.EnterThePlayerNumber}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <span>{content.PlayerName}</span>
                      <div className="flex items-center justify-between border-2 border-Pink p-1 cursor-pointer rounded-md w-fit mt-1 text-end">
                        <p
                          className="relative"
                          onClick={() =>
                            handleSubmitPlayer(
                              "th-p-apis/" +
                                dataAll?.th_party_api_id +
                                "?number=" +
                                formData?.player_number,
                              "",
                              true
                            )
                          }
                        >
                          {loadingPlayer ? "Loading...." : content.searchPlayer}
                        </p>
                        <CiSearch size={20} />
                      </div>
                    </div>
                    <div className="w-full py-5 px-4 outline-none border border-[#707070] mt-3  rounded-xl">
                      {dataPlayer?.data?.data?.username ||
                        dataPlayer?.data?.msg ||
                        dataPlayer?.data?.message}
                    </div>
                  </div>
                </>
              )}
              <p className="text-red-600">
                {dataAll?.note ? dataAll?.note : ""}
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
                <div className="w-full">
                  <span>{content.Quantity}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData.quantity}
                  </p>
                </div>
                <div className="w-full">
                  <span>{content.Total}</span>
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
                </div>
                <div className="w-full">
                  <span>{content.E_mailOrPhoneNumber}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData.email_or_phone_number}
                  </p>
                </div>
                <div className="w-full">
                  <span>{content.PasswordOptional}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData.password}
                  </p>
                </div>
                <div className="w-full">
                  <span>{content.ContactNumber}</span>
                  <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    {formData.contact_number}
                  </p>
                </div>
                {dataAll?.require_player_number === 1 && (
                  <div className="w-full ">
                    <span>{content.PlayerNumber}</span>
                    <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                      {formData?.player_number}
                    </p>
                  </div>
                )}
                {dataAll?.th_party_api_id &&
                  !dataAll?.require_player_number && (
                    <>
                      <div className="w-full ">
                        <span>{content.PlayerNumber}</span>
                        <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                          {formData?.player_number}
                        </p>
                      </div>
                      <div className="w-full ">
                        <span>{content.PlayerName}</span>
                        <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                          {dataPlayer?.data?.data?.username ||
                            dataPlayer?.data.msg ||
                            dataPlayer?.data?.message}
                        </p>
                      </div>
                    </>
                  )}
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

export default ProductsThree;
