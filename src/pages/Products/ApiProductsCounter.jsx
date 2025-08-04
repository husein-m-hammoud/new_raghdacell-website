import { useParams } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import {
  Container,
  Currency,
  Loading,
  PopUp,
  Requirements,
  TitleTwo,
  UnavvailablePopup,
} from "../../components";
import { NavLink } from "react-router-dom";

import { fileUrl, useFETCH, usePOST } from "../../Tools/APIs";
import { useEffect, useState } from "react";

const ApiProductsCounter = ({ data, dataPackages }) => {
  const { content, showPopUp, setShowPopUp, profile } = useContextTranslate();
  const { id } = useParams();
  const [showUnavailablePopup, setShowUnavailablePopup] = useState(false);
  const { data: player_numbers } = useFETCH(`player_number/info`);

  const [checkNumber, setCheckNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // const { data, isLoading } = useFETCH(
  //   `products/${id}?local=${localStorage.getItem("language")}`
  // );
  // const { data: dataPackages, isLoading: isLoadingPack } = useFETCH(`products/${id}/packages`);
  let language = localStorage.getItem("language");
  const notShowInPopup = [
    "package_id",
    "qty",
    "product_id",
    "player_number",
    "product_reference",
  ];

  let mergedData, package_id;
  let dataAll = data?.data.data;
  console.log(dataAll, "dataAll");
  console.log(dataPackages, "dataPackages");
  if (
    dataPackages?.data?.data.length == 1 &&
    dataPackages?.data?.data[0].type !== "package"
  ) {
    mergedData = dataPackages?.data?.data[0];

    package_id = mergedData?.id;
    mergedData["package_id"] = package_id;
    mergedData["images"] = dataAll?.images;
    mergedData["name"] = dataAll?.name;

    mergedData["note"] = dataAll?.note ? dataAll?.note : "";
    console.log({ mergedData });
    dataAll = mergedData;

    // var tmprequirements = dataAll?.requirements
    // if (tmprequirements) {
    //   tmprequirements = json.parse(tmprequirements);
    //   const checkPlayerId = tmprequirements.find(person => person.name === 'player_id') !== undefined;
    //   if(checkPlayerId) {
    //     dataAll.require_player_number = 1;
    //   }

    // }
  }
  console.log({ dataAll });

  const handleGoBackAndReload = () => {
    // Logic to go back one page and reload

    window.history.go(-1);
    //window.location.reload();
  };

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
  const handleSubmitMain = (e) => {
    e.preventDefault();
    var goToOrders = "/Orders";

    if (formData.qty < dataAll?.minimum_qut) {
      setError(
        language === "en"
          ? "Quantity must be greater than or equal to " + dataAll?.minimum_qut
          : `يجب أن تكون الكمية أكبر أو تساوي ${dataAll?.minimum_qut}`
      );
      return;
    }
    if (dataAll?.maximum_qut > 0 && formData.qty > dataAll?.maximum_qut) {
      setError(
        language === "en"
          ? "Quantity must be less than or equal to " + dataAll?.maximum_qut
          : `يجب أن تكون الكمية أقل أو تساوي ${dataAll?.maximum_qut}`
      );
      return;
    }

    // Validate required fields
    const requirements = JSON.parse(dataAll?.requirements || "[]");
    const fieldErrors = validateRequirements(requirements, formData, language);
    if (fieldErrors.length > 0) {
      setError(fieldErrors[0]); // Or show all in a list if you prefer
      return;
    }

    setIsLoading(true);
    handleSubmit(`automated/get/packages`, goToOrders);
    setIsLoading(false);
  };
  const validateRequirements = (requirements, formData, language = "en") => {
    const errors = [];

    requirements.forEach((req) => {
      const value = formData[req.name];

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        const message =
          language === "en"
            ? `${req.label} is required.`
            : `حقل ${req.label} مطلوب.`;

        errors.push(message);
      }
    });

    return errors;
  };

  const calculatePrice = (price = null, percentage = null) => {
    if (percentage <= 0 || percentage == undefined) {
      return price;
    }
    let newPrice = price * (1 + percentage / 100);

    return newPrice;
  };

  useEffect(() => {
    if (dataPlayer?.data?.data?.username) {
      setCheckNumber(formData?.player_number);

      setFormData({
        ...formData,
        player_name: dataPlayer?.data?.data?.username,
      });
    }
  }, [dataPlayer?.data?.data?.username]);

  useEffect(() => {
    if (dataAll != null) {
      setShowUnavailablePopup(
        dataAll?.is_available == 0 || dataAll?.force_unavailable == 1
          ? true
          : false
      );
    }

    setFormData({
      ...formData,
      qty: dataAll?.minimum_qut,
      product_id: dataAll?.package_id,
      product_reference: dataAll?.product_reference,
    });
  }, [dataAll]);
  function convertLabel(input) {
    // Replace underscore with a space
    let result = input.replace("_", " ");

    // Capitalize the first letter of each word
    result = result
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return result;
  }

  useEffect(() => {
    if (dataPlayer?.data?.data?.username) {
      setCheckNumber(formData?.player_number);
    }
  }, [dataPlayer?.data?.data?.username]);

  // if(isLoading || isLoadingPack) {
  //   return <Loading />;
  // }

  const handleChangeQty = (e) => {
    const { name, value } = e.target;
    if (dataAll?.maximum_qut != null && dataAll?.maximum_qut > 0) {
      console.log(value, dataAll?.maximum_qut);

      if (value > dataAll?.maximum_qut) {
        setFormData({
          ...formData,
          qty: dataAll?.maximum_qut,
        });
        return;
      }
    }
    // if (value < 1) {
    //   setFormData({
    //     ...formData,
    //     qty: dataAll?.minimum_qut,
    //   });
    //   return;
    // }
    handleChangeInput(e);
  };
  if (showUnavailablePopup) {
    return (
      <UnavvailablePopup
        isOpen={true}
        handleGoBackAndReload={handleGoBackAndReload}
      />
    );
  }

  return (
    <section className="py-3 font-semibold ">
      <Container>
        {isLoading ? <Loading /> : ""}

        <div className="py-4 mt-4">
          <div className="flex justify-center gap-6 max-sm:flex-wrap">
            <div className="w-1/2 max-md:w-full">
              <img
                src={fileUrl + dataAll?.image}
                alt=""
                className="w-full object-cover rounded-3xl"
              />
            </div>
            <div className="w-1/2 max-md:w-full space-y-2">
              <div className="flex justify-center gap-5">
                <div className="w-full">
                  <span>{content.Quantity}</span>
                  <p>
                    <input
                      name="qty"
                      type="number"
                      step="1"
                      value={formData?.qty}
                      onChange={(e) => handleChangeQty(e)}
                      placeholder={dataAll?.minimum_qut || "1234..."}
                      className={`${
                        formData.qty < dataAll?.minimum_qut
                          ? "shadow-md shadow-red-500 "
                          : ""
                      } py-5 px-4 border mt-3  border-[#707070] rounded-xl w-full outline-none`}
                    />
                    <h5 className="text-red-600">
                      {dataAll?.minimum_qut
                        ? language === "en"
                          ? `minimum ${dataAll.minimum_qut}`
                          : `الحد الادنى ${dataAll.minimum_qut} `
                        : ""}
                    </h5>
                  </p>
                </div>
                <div className="w-full ">
                  <span>{content.Total}</span>
                  <p className="bg-[#9A9A9A] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    <Currency
                      number={
                        formData?.qty *
                          (profile?.type === "COMPANY"
                            ? +calculatePrice(
                                dataAll?.company_price,
                                dataAll?.company_percentage
                              )
                            : +calculatePrice(
                                dataAll?.user_price,
                                dataAll?.user_percentage
                              )) || 0
                      }
                    />
                  </p>
                </div>
              </div>
              <Requirements
                data={dataAll}
                formData={formData}
                setFormData={setFormData}
                handleSubmitPlayer={handleSubmitPlayer}
                handleChangeInput={handleChangeInput}
                loadingPlayer={loadingPlayer}
                content={content}
                dataPlayer={dataPlayer}
                player_numbers={player_numbers?.data?.data?.player_number}
              />

              <p className="text-red-600">
                {dataAll?.note ? dataAll?.note : ""}
              </p>
              <button
                onClick={() => setShowPopUp(true)}
                className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Purple hover:bg-opacity-90"
              >
                {content.Buy}
              </button>
              <div className="text-red-500 font-semibold text-center">
                {error}
              </div>
            </div>
          </div>
        </div>
        {loading ? <Loading /> : ""}

        <PopUp
          loading={loading}
          showPopup={showPopUp}
          onClick={handleSubmitMain}
        >
          <div className="w-full mb-2">
            <span>{content.Quantity}</span>
            <p className="bg-[#D8D8D8]  py-5 px-4 border border-[#707070] rounded-xl">
              {formData?.qty || 0}
            </p>
          </div>
          <div className="w-full mb-2">
            <span>{content.Total}</span>
            <p className="bg-[#D8D8D8]  py-5 px-4 border border-[#707070] rounded-xl">
              <Currency
                number={
                  formData?.qty *
                    (profile?.type === "COMPANY"
                      ? +calculatePrice(
                          dataAll?.company_price,
                          dataAll?.company_percentage
                        )
                      : +calculatePrice(
                          dataAll?.user_price,
                          dataAll?.user_percentage
                        )) || 0
                }
              />
            </p>
          </div>
          {formData &&
            Object.entries(formData).map(([item, value]) => (
              <>
                {!notShowInPopup.includes(item) && (
                  <div className="w-full mb-2 ">
                    <span className="capitalize">{convertLabel(item)}</span>
                    <p className="bg-[#D8D8D8]  py-5 px-4 border border-[#707070] rounded-xl">
                      {value}
                    </p>
                  </div>
                )}
              </>
            ))}
          <div className="text-red-500 font-semibold text-center">{error}</div>
        </PopUp>
      </Container>
    </section>
  );
};

export default ApiProductsCounter;
