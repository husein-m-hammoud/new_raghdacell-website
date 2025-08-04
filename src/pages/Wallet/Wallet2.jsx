import { Container, Currency, Loading } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useContextTranslate } from "../../Context/ContextAPI";
import expo from "../../images/Group.png";
import impo from "../../images/Group 20.png";
import { useFETCH } from "../../Tools/APIs";
import { useParams } from "react-router-dom";
const Wallet2 = () => {
  const { content } = useContextTranslate();
  const { id } = useParams();
  const { data, isLoading } = useFETCH(
    `payment-logs/${id}?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  return (
    <section className="py-4">
      <Container>
        {isLoading ? <Loading /> : ""}
        <Row justify="center">
          <Col
            className="border border-Pink rounded-2xl p-5 flex max-md:flex-col gap-10"
            lg={12}
          >
            <div className=" w-1/2 max-md:w-full">
              {dataAll?.status === "Discounted" ? (
                <img src={expo} alt="" className="rounded-2xl h-full mx-auto" />
              ) : (
                <img src={impo} alt="" className="rounded-2xl h-full mx-auto" />
              )}
            </div>
            <div className="w-1/2  max-md:w-full">
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.Orderstatus} :
                </div>
                <div
                  className={`${
                    dataAll?.status === "Discounted"
                      ? "text-red-400"
                      : "text-green-600"
                  } font-semibold`}
                >
                  {dataAll?.status}
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.Processname} :
                </div>
                <div>{dataAll?.name}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">{content.Date} : </div>
                <div>{dataAll?.date}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">{content.Time} : </div>
                <div>{dataAll?.time}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.previousvalue}:
                </div>
                <div>
                  <Currency
                    number={dataAll?.previous_balance}
                    currency={dataAll?.currency}
                  />
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">
                  {content.currentvalue} :
                </div>
                <div>
                  <Currency
                    number={dataAll?.current_balance}
                    currency={dataAll?.currency}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Wallet2;
