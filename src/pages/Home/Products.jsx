import InfiniteScroll from "react-infinite-scroll-component";
import React, { useEffect, useState } from "react";

import { useContextTranslate } from "../../Context/ContextAPI";
import { Col, Row } from "../../Grid-system";
import { fileUrl } from "../../Tools/APIs";
import {
  CardProducts,
  Container,
  LoadingProducts,
  Title,
} from "../../components/index";

const Products = () => {
  const { content, page, setPage, dataProducts, products, relod, setRelod } =
    useContextTranslate();
    useEffect(() => {
      setRelod(!relod);
      setPage(15)
      }, []);
    
  return (
    <section lassName="py-4 ">
      <Container>
        <Title title={content.products} />
        <InfiniteScroll
          className="!overflow-hidden"
          dataLength={products?.length}
          next={() => setPage(page + 15)}
          refreshFunction={() => console.log("1")}
          hasMore={dataProducts?.data.data.length > products?.length}
          loader={
            <Row justify="center">
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
              <Col sm={7} xs={5} lg={3}>
                <LoadingProducts />
              </Col>
            </Row>
          }
          pullDownToRefreshThreshold={300}
        >
          <Row justify="center">
            {products?.map((e) => (
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
        </InfiniteScroll>
      </Container>
    </section>
  );
};

export default Products;
