import { useContextTranslate } from "../../Context/ContextAPI";
import { Col, Row } from "../../Grid-system";
import { useFilter } from "../../Tools/APIs";

const FilterOrderStatus = () => {
  const { content } = useContextTranslate();
  const { filter, setFilter } = useFilter();
  return (
    <Row>
      <Col md={4}>
        <select

          value={filter.get("status")}
          onChange={(e) =>
            setFilter({
              status: e.target.value,
              page: filter.get("page") ? filter.get("page") : "",
              id: filter.get("id") ? filter.get("id") : "",
            })
          }
          className="text-white rounded-xl cursor-pointer text-center py-1 w-[120px] bg-Purple hover:bg-opacity-90 outline-none"
        >
          <option value="" onClick={() => setFilter({})} className="bg-Pink">
            {content.All}
          </option>
          <option value="COMPLETED" className="bg-Pink">
            {content.Completed}
          </option>
          <option value="CANCELED" className="bg-Pink">
            {content.Canceled}
          </option>
          <option value="WAITING" className="bg-Pink">
            {content.Waiting}
          </option>
        </select>
      </Col>
    </Row>
  );
};

export default FilterOrderStatus;
