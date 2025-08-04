import React, { useEffect, useState } from "react";
import Products from "./Products";
import InfiniteScroll from "react-infinite-scroll-component";
import { Col, Row } from "../../Grid-system";
import { CardProducts, Container, LoadingProducts,TitleTwo ,Loading} from "../../components";
import { fileUrl, useFETCH } from "../../Tools/APIs";
import { useContextTranslate } from "../../Context/ContextAPI";

import { useParams } from "react-router-dom";

const GroupProducts = () => {

      const { id } = useParams();
      const { data, isLoading } = useFETCH(
        `products/by-group/${id}?local=${localStorage.getItem("language")}`
      );

      const { data: product_data, isLoading:isLodingProduct } = useFETCH(
        `products/${id}?local=${localStorage.getItem("language")}`
      );

     let products =  data?.data?.data?.products || [];
    const { content } = useContextTranslate();
    
  return (
    <section className="py-5 ">
      {isLodingProduct && <Loading />}
      <TitleTwo title={product_data?.data.data.name} />
      <Container>
          <Row justify="center">
            {products && products?.map((e) => (
              <Col sm={7} xs={5} lg={3} key={e.id}>
                <CardProducts
                  className={`${
                    e.available
                      ? `hover:bg-Pink mb-2 hover:text-white hover:-translate-y-2`
                      : ""
                  }`}
                  link={`${
                    e.available ? `/products/products-${e.number}/${e.id}` : ""
                  }`}
                  image={fileUrl + e.image}
                  title={e.name}
                  active={e.available ? `` : `${content.unAvailable}`}
                  bg={e.available ? `` : `bg-black/10`}
                />
              </Col>
            ))}
          </Row>
      </Container>
    </section>
  
  );
};

export default GroupProducts;