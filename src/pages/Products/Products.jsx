const Products = () => {
  return (
    <section className="py-4 ">
      {/* <Container>
        <Title title={content.products} />
        <Row justify="center" ref={rowRef}>
          {isLoading ? (
            <>
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
            </>
          ) : (
            ""
          )}
          {products?.map((e) => (
            <Col sm={7} xs={5} lg={3} key={e.id}>
              <CardProducts
                className={`${
                  e.available
                    ? `hover:bg-Pink mb-2 hover:text-white hover:-translate-y-2`
                    : ""
                } `}
                link={`${
                  !e.available ? `/products/products-${e.number}/${e.id}` : ""
                }`}
                image={fileUrl + e.image}
                title={e.name}
                active={e.available ? `` : `${content.unAvailable}`}
                bg={e.available ? `` : `bg-black/10`}
              />
            </Col>
          ))}
        </Row>
      </Container> */}
    </section>
  );
};

export default Products;
