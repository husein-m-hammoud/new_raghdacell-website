import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Products from "./Products";
import InfiniteScroll from "react-infinite-scroll-component";
import { Col, Row } from "../../Grid-system";
import { CardProducts, Container, LoadingProducts } from "../../components";
import { fileUrl, useFETCH } from "../../Tools/APIs";
import { useContextTranslate } from "../../Context/ContextAPI";
const Home = () => {
  return (
    <>
      <Hero />
      <Products />
    </>
  );
};

export default Home;
const MyComponent = () => {
  const { content, page, setDataproducts, setPage } = useContextTranslate();
  const [products, setProducts] = useState([]);
  const { data, isLoading } = useFETCH(
    `products?paginate=1&local=${localStorage.getItem("language")}&page=${page}`
  );
  useEffect(() => {
    if (data?.data.data.data.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...data?.data.data.data]);
    } else if (data?.data.data.data.length === 0) {
      setDataproducts(false);
    }
  }, [data?.data.data.data]);


  return (
    <Container>
      <InfiniteScroll
        dataLength={products?.length}
        next={() => setPage(page + 1)}
        refreshFunction={() => console.log("1")}
        hasMore={data?.data.data.data.length >= 10}
        loader={
          <Row>
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
        pullDownToRefresh
        pullDownToRefreshThreshold={0}
      >
        <Row>
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
  );
};
