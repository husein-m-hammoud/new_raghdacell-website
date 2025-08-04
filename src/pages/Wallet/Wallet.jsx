import React from "react";
import {
  Container,
  Currency,
  DateFilter,
  Loading,
  TitleTwo,
} from "../../components";
import expo from "../../images/Group.png";
import impo from "../../images/Group 20.png";
import { useContextTranslate } from "../../Context/ContextAPI";
import { Col, Row } from "../../Grid-system";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { useFETCH, useFilter } from "../../Tools/APIs";
import Pagination from "../../Tools/Pagination";

const Wallet = () => {
  const { content } = useContextTranslate();
  const { filter, setFilter } = useFilter();
  const { data, isLoading } = useFETCH(
    `payment-logs?local=${localStorage.getItem("language")}${
      filter.get("status") ? "&status=" + filter.get("status") : ""
    }${filter.get("page") ? "&page=" + filter.get("page") : ""}${
      filter.get("end_date")
        ? "&end_date=" + filter.get("end_date") + " 00:00:00"
        : ""
    }${
      filter.get("date") && !filter.get("start_date") + " 00:00:00"
        ? "&start_date=" + filter.get("date") + " 00:00:00"
        : filter.get("start_date")
        ? "&start_date=" + filter.get("start_date") + " 00:00:00"
        : ""
    }`
  );

  return (
    <section className="py-4">
      <Container>
        <TitleTwo title={content.Wallet} />
        {isLoading ? <Loading /> : ""}
        <Row ow className="py-5 gap-2 text-center" justify="center">
          <Col
            sm={5}
            xs={4}
            className="p-1 py-4 text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-Pink  font-semibold"
          >
            <h6>
              <Currency
                number={data?.data.user.current_balance}
                currency={data?.data.user.currency}
              />
            </h6>
            <h6 className="max-sm:text-[16px]">{content.CurrentBalance}</h6>
          </Col>
          <Col
            sm={5}
            xs={4}
            className="p-1 py-4 text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-green-700 font-semibold"
          >
            <h6>
              <Currency
                number={data?.data.user.total_shipped}
                currency={data?.data.user.currency}
              />
            </h6>
            <h6 className="max-sm:text-[16px]">{content.ShippingTotal} </h6>
          </Col>
          <Col
            sm={5}
            xs={4}
            className="p-1 py-4 text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-Purple font-semibold"
          >
            <h6>
              <Currency
                number={data?.data.user.total_spent}
                currency={data?.data.user.currency}
              />
            </h6>
            <h6 className="max-sm:text-[16px]">{content.TotalPayment}</h6>
          </Col>
        </Row>
        <div className="flex flex-col justify-center ">
          <div className="space-x-2 mx-auto flex justify-around items-center w-full">
            <select
              value={filter.get("status")}
              className="text-white rounded-xl cursor-pointer text-center py-1 w-[120px] bg-Purple hover:bg-opacity-90 outline-none"
              onChange={(e) =>
                setFilter({
                  status: e.target.value,
                  page: filter.get("page") ? filter.get("page") : "",
                })
              }
            >
              <option
                value=""
                onClick={() => setFilter({})}
                className="bg-Pink"
              >
                {content.All}
              </option>
              <option value="Discounted" className=" bg-Pink">
                {content.Exports}
              </option>
              <option value="Charged" className=" bg-Pink">
                {content.Imports}
              </option>
            </select>
            <DateFilter />
          </div>

          <Pagination
            pageCount={Math.ceil(
              data?.data.data.total / data?.data.data.per_page
            )}
          >
            <div className="overflow-x-auto">
              <table className="w-full  mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
                <thead className="bg-Pink text-white h-[70px]">
                  <tr>
                    <td className="">{content.Event}</td>
                    <td className="max-md:hidden">{content.Orderstatus}</td>
                    <td className="max-md:hidden">{content.Processname}</td>
                    <td className="max-md:hidden">{content.Date}</td>
                    <td className="max-md:hidden">{content.Time}</td>
                    <td>{content.previousvalue}</td>
                    <td>{content.Value}</td>
                    <td>{content.currentvalue}</td>
                    <td className="">{content.Actoin}</td>
                  </tr>
                </thead>
                {data?.data.data.data.map((e, i) => (
                  <tbody className="" key={i}>
                    <tr className="border border-Pink ">
                      <td>
                        <div className="w-[60px] h-[60px] mx-auto ">
                          {e.status === "Discounted" ? (
                            <img
                              src={expo}
                              alt=""
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <img
                              src={impo}
                              alt=""
                              className="w-full h-full rounded-full"
                            />
                          )}
                        </div>
                      </td>
                      <td
                        className={`${
                          e.status === "Discounted"
                            ? "text-red-600"
                            : "text-green-600"
                        } font-semibold py-7 max-md:hidden`}
                      >
                        {e.status}
                      </td>
                      <td className="text-green-600 font-semibold py-7 max-md:hidden">
                        {e.name}
                      </td>
                      <td className="max-md:hidden">{e.date}</td>
                      <td className="max-md:hidden">{e.time}</td>
                      <td className="text-xl line-through text-Pink">
                        <Currency
                          number={e.previous_balance}
                          currency={e.currency}
                        />
                      </td>
                      <td className="text-xl">
                        <Currency number={e.value} currency={e.currency} />
                      </td>
                      <td className="text-xl  text-green-600">
                        <Currency
                          number={e.current_balance}
                          currency={e.currency}
                        />
                      </td>
                      <td className="text-red-600 font-semibold ">
                        <Link to={`/wallet/${e.id}`}>
                          <BiShow
                            className="mx-auto cursor-pointer"
                            size={25}
                          />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default Wallet;
