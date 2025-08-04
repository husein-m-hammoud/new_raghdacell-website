import { Container, TitleTwo, Loading } from "../../components";
import SecProductsOne from "./Products-One/SecProductsOne";
import ApiProductsCounter from "./ApiProductsCounter";
import React, { useState, useEffect } from "react";

import { useContextTranslate } from "../../Context/ContextAPI";
import { useFETCH } from "../../Tools/APIs";
import { useParams } from "react-router-dom";

const ApiProducts = () => {
  const [isCounter, setIsCounter] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useFETCH(
    `products/${id}?local=${localStorage.getItem("language")}`
  );

  const { data: dataPackages, isLoading: isLoadingPack } = useFETCH(
    `products/${id}/packages`
  );

  useEffect(() => {
    if (
      data?.data?.data.istoken == 1 ||
      (dataPackages?.data?.data.length == 1 &&
        dataPackages?.data?.data[0].type !== "package")
    ) {
      setIsCounter(true);
    } else {
      setIsCounter(false);
    }
  }, [data, dataPackages]);

  console.log("hussein", isCounter, dataPackages);
  if (isLoading || isLoadingPack) {
    return <Loading />;
  }

  return (
    <section className="py-3 ">
      <TitleTwo title={data?.data.data.name} />
      <Container>
        {isCounter ? (
          <ApiProductsCounter data={data} dataPackages={dataPackages} />
        ) : (
          <SecProductsOne number={6} />
        )}
      </Container>
    </section>
  );
};

export default ApiProducts;
