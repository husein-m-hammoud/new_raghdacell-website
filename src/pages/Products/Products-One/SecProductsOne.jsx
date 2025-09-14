import {
  CardProducts,
  LoadingProducts,
  Title,
  TitleTwo,
} from "../../../components";
import { useContextTranslate } from "../../../Context/ContextAPI";
import { Col, Row } from "../../../Grid-system";
import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, useFilter } from "../../../Tools/APIs";
import { calculatePrice } from "../../../utils/utils";

const SecProductsOne = ({ number = 1 }) => {
  const { content, profile } = useContextTranslate();
  const { id } = useParams();
  const { filter } = useFilter();
  const { data, isLoading } = useFETCH(
    `products/${id}/packages?local=${localStorage.getItem("language")}${
      filter.get("page") ? "&page=" + filter.get("page") : ""
    }`
  );

  return (
    <div className="py-3">
      <div>
        <Title title={content.Packages} />
        <div className="text-xl mb-4">{content.Choosetherightpackage}:</div>
        <Row justify="center">
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
            {data?.data.data.map((e) =>
              e.merge_to ? (
                <Col sm={7} xs={5} lg={3} key={e.id}>
                  <CardProducts
                    image={fileUrl + e.image}
                    link={
                      e.available
                        ? `/products/products-${e.number}/${e.id}`
                        : ""
                    }
                    title={e.name}
                    active={e.available ? `` : `${content.unAvailable}`}
                    bg={e.available ? `` : `bg-black/10`}
                  />
                </Col>
              ) : (
                <Col sm={7} xs={5} lg={3} key={e.id}>
                  <CardProducts
                    image={fileUrl + e.image}
                    link={
                      e.is_available
                        ? `/products/products-${e.number}/packages/${e.id}`
                        : ""
                    }
                    title={e.name}
                    active={e.is_available ? `` : `${content.unAvailable}`}
                    bg={e.is_available ? `` : `bg-black/10`}
                    price={
                      e.number == 6
                        ? profile?.type === "COMPANY"
                          ? calculatePrice(
                              e.company_price,
                              e.company_percentage,
                              e.product_percentage
                            )
                          : calculatePrice(
                              e.user_price,
                              e.user_percentage,
                              e.product_percentage
                            )
                        : profile?.type === "COMPANY"
                        ? calculatePrice(e.company_price, e.product_percentage)
                        : calculatePrice(e.user_price, e.product_percentage)
                    }
                  />
                </Col>
              )
            )}
          </Row>
          {/* </Pagination> */}
        </Row>
      </div>
    </div>
  );
};

export default SecProductsOne;
