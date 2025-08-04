import { Container, Currency, Loading, TitleTwo } from "../../components";
import { useContextTranslate } from "../../Context/ContextAPI";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import Pagination from "../../Tools/Pagination";
import img from "../../images/istockphoto-1136155337-612x612.jpg";
import { fileUrl, useFETCH } from "../../Tools/APIs";
const ShippingPayments = () => {
  const { content } = useContextTranslate();
  const { data, isLoading } = useFETCH(
    `charging-processes?local=${localStorage.getItem("language")}`
  );
  return (
    <div className="py-4">
      <Container>
        <TitleTwo title={content.ShippingPayments} />
        {isLoading ? <Loading /> : ""}
        <Pagination
          pageCount={Math.ceil(
            data?.data.data.total / data?.data.data.per_page
          )}
        >
          <div className="overflow-x-auto">
            <table className=" w-full  mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
              <thead className="bg-Pink text-white h-[70px]">
                <tr>
                  <td>{content.Notice}</td>
                  <td>{content.Value} </td>
                  <td>{content.Shippingvalue}</td>
                  <td className="max-md:hidden">{content.Processname}</td>
                  <td className="max-md:hidden">{content.Date}</td>
                  <td className="max-md:hidden">{content.Time}</td>
                  <td>{content.Orderstatus}</td>
                  <td className="">{content.Actoin}</td>
                </tr>
              </thead>
              {data?.data.data.data.map((e, i) => (
                <tbody className="" key={i}>
                  <tr className="border border-Pink ">
                    <td>
                      <div className="w-[60px] h-[60px] mx-auto ">
                        <img
                          src={
                            e.name === "PROMO_CODE" ? img : fileUrl + e.image
                          }
                          alt=""
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    </td>
                    <td className="text-green-600 font-semibold py-7">
                      <Currency number={e.value} currency={e.currency} />
                    </td>
                    <td className="text-green-600 font-semibold py-7">
                      <Currency
                        number={e.shipping_value}
                        currency={e.currency}
                      />
                    </td>
                    <td className="text-green-600 font-semibold py-7 max-md:hidden">
                      {e.name}
                    </td>
                    <td className="max-md:hidden">{e.date}</td>
                    <td className="max-md:hidden">{e.time}</td>
                    <td className=" font-semibold py-7">
                      {e.status === "WAITING" && (
                        <p className="text-blue-300">{e.status}</p>
                      )}
                      {e.status === "COMPLETED" && (
                        <p className="text-green-600">{e.status}</p>
                      )}
                      {e.status === "CANCELED" && (
                        <p className="text-red-600">{e.status}</p>
                      )}
                    </td>
                    <td className="text-red-600 font-semibold  ">
                      <Link to={`/shipping-payments/${e.id}`}>
                        <BiShow className="mx-auto cursor-pointer" size={25} />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Pagination>
      </Container>
    </div>
  );
};

export default ShippingPayments;
