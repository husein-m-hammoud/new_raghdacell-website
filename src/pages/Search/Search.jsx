import { Col, Row } from "../../Grid-system";
import { CardProducts, Container, LoadingProducts } from "../../components";
import { useFETCH, useFilter, fileUrl } from "../../Tools/APIs";
import { useContextTranslate } from "../../Context/ContextAPI";

function Search() {
  const { content } = useContextTranslate();
  const { filter } = useFilter();
  const { data, isLoading } = useFETCH(
    `products?search=${filter.get("q")}&local=${localStorage.getItem(
      "language"
    )}${filter.get("page") ? "&page=" + filter.get("page") : ""}`
  );
  return (
    <div className="mt-16">
      <Container>
        <Row justify="center">
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
          {data?.data.data.map((e) => (
            <Col sm={7} xs={5} lg={3} key={e.id}>
              {isLoading ? (
                <LoadingProducts />
              ) : (
                <CardProducts
                  className={`${
                    e.available
                      ? `hover:bg-Pink mb-2 hover:text-white hover:-translate-y-2`
                      : ""
                  } `}
                  link={`${
                    e.available ? `/products/products-${e.number}/${e.id}` : ""
                  }`}
                  image={fileUrl + e.image}
                  title={e.name}
                  active={e.available ? `` : `${content.unAvailable}`}
                  bg={e.available ? `` : `bg-black/10`}
                />
              )}
            </Col>
          ))}
          {data?.data.data == 0 && (
            <div className="text-center text-3xl font-semibold my-5 h-[60vh] flex justify-center items-center">
              There are no items to show
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}
export default Search;
