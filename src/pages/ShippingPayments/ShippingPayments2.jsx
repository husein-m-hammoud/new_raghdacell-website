import React from "react";
import { Container, Loading } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useContextTranslate } from "../../Context/ContextAPI";
import { clickZoomInImage, fileUrl, useFETCH } from "../../Tools/APIs";
import { useParams } from "react-router-dom";

const ShippingPayments2 = () => {
  const { content } = useContextTranslate();
  const { id } = useParams();
  const { data, isLoading } = useFETCH(
    `charging-processes/${id}?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  return (
    <section className="py-4">
      <Container>
        <Row justify="center">
          {isLoading ? <Loading /> : ""}
          <Col
            className="border border-Pink rounded-2xl p-5 flex items-center max-md:flex-col gap-10"
            lg={15}
          >
            <div className=" w-1/2 max-md:w-full">
              <img
                src={fileUrl + dataAll?.image}
                alt=""
                onClick={clickZoomInImage}
                className="rounded-2xl w-[90%] h-full mx-auto"
              />
            </div>
            <div className="w-1/2  max-md:w-full">
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">{content.Value} :</div>
                <div>{dataAll?.value}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.Shippingvalue} :
                </div>
                <div>{dataAll?.shipping_value}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">{content.Date}: </div>
                <div>{dataAll?.date}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.Time || "Time"} :
                </div>
                <div>{dataAll?.time}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.Orderstatus}:
                </div>
                {dataAll?.status === "WAITING" && (
                  <p className="text-blue-500 font-semibold">
                    {dataAll?.status}
                  </p>
                )}
                {dataAll?.status === "COMPLETED" && (
                  <p className="text-green-600 font-semibold">
                    {dataAll?.status}
                  </p>
                )}
                {dataAll?.status === "CANCELED" && (
                  <p className="text-red-600 font-semibold">
                    {dataAll?.status}
                  </p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShippingPayments2;
