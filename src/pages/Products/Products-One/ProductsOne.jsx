import SecProductsOne from "./SecProductsOne";
import { Container, TitleTwo } from "../../../components";
import { useContextTranslate } from "../../../Context/ContextAPI";
import { useFETCH } from "../../../Tools/APIs";
import { useParams } from "react-router-dom";

const ProductsOne = () => {
  const { id } = useParams();
  const { data } = useFETCH(
    `products/${id}?local=${localStorage.getItem("language")}`
  );

  return (
    <section className="py-3 ">
      <Container>
        <TitleTwo title={data?.data.data.name} />
        <SecProductsOne
         
        />
      </Container>
    </section>
  );
};

export default ProductsOne;
