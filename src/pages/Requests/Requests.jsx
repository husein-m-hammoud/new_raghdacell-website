import {
  Container,
  Currency,
  DateFilter,
  FilterOrderStatus,
  Loading,
  TitleTwo,
  CopyableText
} from "../../components";
import { useContextTranslate } from "../../Context/ContextAPI";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { fileUrl, useFETCH, useFilter, checkOrderStatus } from "../../Tools/APIs";
import Pagination from "../../Tools/Pagination";
import React, { useEffect } from "react";


const Orders = () => {
  const { content } = useContextTranslate();
  const { filter } = useFilter({});
  const { data, isLoading, prevUrl, reCallUrl } = useFETCH(
    `orders?local=${localStorage.getItem("language")}${
      filter.get("status") ? "&status=" + filter.get("status") : ""
    }${filter.get("page") ? "&page=" + filter.get("page") : ""}${
      filter.get("end_date")
        ? "&end_date=" + filter.get("end_date") + " 00:00:00"
        : ""
    }${
      filter.get("date") && !filter.get("start_date")
        ? "&start_date=" + filter.get("date") + " 00:00:00"
        : filter.get("start_date")
        ? "&start_date=" + filter.get("start_date") + " 00:00:00"
        : ""
    }`
  );
  

  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      try {
        // Call your asynchronous function here
        const data = await checkOrderStatus();
        if(prevUrl){
          reCallUrl(prevUrl);
          console.log('reCallUrl');
        }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(fetchDataInterval);
  }, [prevUrl]); // Empty dependency array ensures useEffect runs only once


  const renderCodes = (codes) =>{
    console.log({ codes });
    if(codes) {
      codes = JSON.parse(codes)
    }
    console.log({ codes });
    return codes.map((item, index) => (
  
     <CopyableText text={item?.code} />  
    ));
   }
  return (
    <section className="py-4">
      <Container>
        <TitleTwo title={content.Orders} />
        <div className="flex flex-col justify-center mt-5">
          <div className="space-x-2 mx-auto flex items-center justify-around w-full">
            <FilterOrderStatus />
            <DateFilter />
          </div>
          {isLoading ? <Loading /> : ""}
          <Pagination
            pageCount={Math.ceil(
              data?.data.data.total / data?.data.data.per_page
            )}
          >
            <div className="">
              <table className="w-full  mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
                <thead className="bg-Pink text-white h-[70px]">
                  <tr>
                    <td>{content.products}</td>
                    <td className="max-md:hidden">ID</td>
                    <td className="max-md:hidden">{content.PlayerNumber}</td>
                    <td className="max-md:hidden">{content.PlayerName}</td>
                    <td>{content.Orderstatus}</td>
                    <td className="max-md:hidden">{content.Date}</td>
                    <td className="max-md:hidden">{content.Time}</td>
                    <td>{content.Price}</td>
                    <td>{content.Actoin}</td>
                  </tr>
                </thead>
                {data?.data.data.data.map((e, i) => (
                  <tbody className="" key={i}>
                    <tr className="border border-Pink ">
                      <td>
                        <div className="w-[60px] h-[60px] mx-auto ">
                          <img
                            src={fileUrl + e.product_image}
                            alt=""
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      </td>
                      <td className="max-md:hidden">{e.id || "__"}</td>
                      <td className="max-md:hidden">
                        {e.player_number || "__"}
                      </td>
                      <td className="max-md:hidden">{e.player_name || "__"}</td>
                      <td className=" font-semibold py-7">
                        {e.status === "WAITING" && (
                          <p className="text-blue-600">{e.status || "__"}</p>
                        )}
                         {e.status === "FAILED" && (
                          <p className="text-blue-600">{'WAITING' }</p>
                        )}
                        {e.status === "COMPLETED" && (
                          <p className="text-green-600">{e.status || "__"}</p>
                        )}
                        {e.status === "CANCELED" && (
                          <p className="text-red-600">{e.status || "__"}</p>
                        )}
                        {e.refuse_reason !== null && (
                          <p className="text-red-600 py-2">{e.refuse_reason}</p>
                        )}
                        <p className="text-Purple">
                          {e.accept_note ? e.accept_note : ""}
                        </p>
                        {e?.item_codes != null && e.status === "COMPLETED"  && (
                     
                     <div className="flex gap-2 mb-2 text-center justify-center">
                      
                       <div
                    
                         className={`font-semibold`}
                       >
                        
                        { renderCodes(e?.item_codes)}
                       </div>
                       
                     </div>
                   
                    )}
                      </td>
                      <td className="max-md:hidden">{e.date || "__"}</td>
                      <td className="max-md:hidden">{e.time || "__"}</td>
                      <td className="text-green-600 font-semibold  ">
                        <Currency
                          number={e.total_price}
                          currency={e.currency}
                        />
                      </td>
                      <td className="text-red-600 font-semibold ">
                        <Link to={`/Orders/${e.id}`}>
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

export default Orders;
