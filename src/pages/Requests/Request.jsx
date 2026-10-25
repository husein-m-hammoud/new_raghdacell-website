import { useParams } from "react-router-dom";
import {
  Currency,
  Loading,
  TitleTwo,
  CopyableText,
  CopyAllCodes,
  Back,
} from "../../components";
import { useContextTranslate } from "../../Context/ContextAPI";
import { Col, Container, Row } from "../../Grid-system";
import { fileUrl, useFETCH, checkOrderStatus, productImage } from "../../Tools/APIs";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

// Automated (number 6) packages define their own requirement fields, so the
// order carries them as a flat {name: value} map (`order_fields`) rather than
// fixed columns. Keys are the provider's raw field names, so tidy them up for
// display only -- Arabic names are left untouched.
const humanizeFieldName = (name = "") =>
  name
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());

const parseOrderFields = (raw) => {
  if (!raw) return [];
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Object.entries(parsed).filter(
      ([, value]) => value !== null && value !== ""
    );
  } catch {
    return [];
  }
};

const Request = () => {
  const { content } = useContextTranslate();
  const { id } = useParams();
  const { data, isLoading, reCallUrl } = useFETCH(
    `orders/${id}?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  const orderFields = parseOrderFields(dataAll?.order_fields);
  const [copys, setCopy] = useState(false);
  const text = useRef();
  useEffect(() => {
    setTimeout(() => setCopy(false), 2000);
  }, [copys]);
  console.log({ dataAll });

  // item_codes is a JSON-string of [{code: "..."}]. Parsed defensively so a
  // malformed value can't throw inside render, and so the "copy all" button
  // gets the whole list rather than one line at a time.
  const parseItemCodes = (raw) => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      return [{ code: String(raw) }];
    }
  };

  const renderCodes = () => {
    const codes = parseItemCodes(dataAll?.item_codes);
    return (
      <>
        <CopyAllCodes codes={codes} label={content.copyAll} />
        {codes.map((item, index) => (
          <CopyableText key={index} text={item?.code} />
        ))}
      </>
    );
  };
  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      try {
        // Call your asynchronous function here
        const data = await checkOrderStatus();
        reCallUrl();
        console.log("reCallUrl");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(fetchDataInterval);
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <section className="py-4">
      <Container>
        <TitleTwo title={content.Orders} />
        {isLoading ? <Loading /> : ""}
        <Row justify="center">
          <Col
            className="border border-Pink rounded-2xl p-5 flex max-md:flex-col gap-10"
            lg={15}
          >
            <Row className="p-5">
              <Col md={8}>
                <img
                  src={productImage(dataAll?.product_image, dataAll?.product_image_is_local)}
                  alt=""
                  className="rounded-2xl h-[260px] object-contain mx-auto"
                />
              </Col>
              <Col md={7}>
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">ID : </div>
                          <div>{dataAll?.id}</div>
                        </div>
                      </Col>

                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.Date} :
                          </div>
                          <div>{dataAll?.date}</div>
                        </div>
                      </Col>
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.Time} :
                          </div>
                          <div>{dataAll?.time}</div>
                        </div>
                      </Col>
                      {dataAll?.user.username && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.UserName} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.user.username}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.user.phone_number && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.Phone}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.user.phone_number}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.service_type && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.ServiceType} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.service_type}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.social_link && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.SocialLink}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.social_link}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.wallet_address && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.WalletAddress}:
                            </div>
                            <div className={`  font-semibold break-all`}>
                              {dataAll?.wallet_address}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.email_or_phone_number && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {dataAll.email_or_phone_number.includes("@")
                                ? content.Email
                                : content.PhoneNumber}
                              :
                            </div>
                            <div className="font-semibold">
                              {dataAll.email_or_phone_number}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.password && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.Password} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.password}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.contact_number && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.ContactNumber} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.contact_number}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.refuse_reason && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.RefuseReason}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.refuse_reason}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.accept_note && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              Accept Note :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.accept_note}
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Col md={7}>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.Orderstatus} :
                        </div>
                        <div
                          className={`${
                            dataAll?.status === "WAITING"
                              ? "text-blue-500"
                              : dataAll?.status === "COMPLETED"
                              ? "text-green-600"
                              : dataAll?.status === "CANCELED"
                              ? "text-red-600 "
                              : dataAll?.status === "FAILED"
                              ? "text-blue-500"
                              : ""
                          } font-semibold`}
                        >
                          {dataAll?.status == "FAILED"
                            ? "WAITING"
                            : dataAll?.status}
                        </div>
                      </div>
                    </Col>
                    {dataAll?.item_codes != null &&
                      dataAll.status === "COMPLETED" && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              Codes :
                            </div>
                            <div className={`font-semibold`}>
                              {renderCodes()}
                            </div>
                          </div>
                        </Col>
                      )}

                    {dataAll?.expiry_date && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.expiry_date} :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.expiry_date}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.player_name && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.PlayerName} :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.player_name}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.player_number && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.PlayerNumber} :
                          </div>
                          <div
                            ref={text}
                            onCopy={() => setCopy(true)}
                            className={`font-semibold`}
                          >
                            {dataAll?.player_number}
                          </div>
                          {copys ? (
                            <FaRegCheckCircle size={15} />
                          ) : (
                            <FaRegCopy
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  text.current.innerHTML
                                );
                                setCopy(true);
                              }}
                              size={15}
                              className="cursor-pointer "
                            />
                          )}
                        </div>
                      </Col>
                    )}
                    {orderFields.map(([name, value]) => (
                      <Col key={name}>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {humanizeFieldName(name)} :
                          </div>
                          <div className="font-semibold break-all">
                            {String(value)}
                          </div>
                        </div>
                      </Col>
                    ))}
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.product} :
                        </div>
                        <div>{dataAll?.product_name}</div>
                      </div>
                    </Col>
                    {dataAll?.package_name &&
                      dataAll?.product_name !== dataAll?.package_name && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.Packages}:
                            </div>
                            <div>{dataAll?.package_name}</div>
                          </div>
                        </Col>
                      )}
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.Quantity}:
                        </div>
                        <div>{dataAll?.quantity}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.Total} {content.Price}:
                        </div>
                        <div>
                          <Currency
                            number={dataAll?.total_price}
                            currency={dataAll?.currency}
                          />
                        </div>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Back />
      </Container>
    </section>
  );
};

export default Request;
