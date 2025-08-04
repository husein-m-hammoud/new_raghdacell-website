import { useContextTranslate } from "../../Context/ContextAPI";
import { Col, Row } from "../../Grid-system";
import { useFilter } from "../../Tools/APIs";

const DateFilter = () => {
  const { filter, setFilter } = useFilter();
  const { content } = useContextTranslate();
  return (
    <>
      <Row className="items-center" justify={"end"}>
        {filter.get("date") === "2000-01-01" && (
          <Col md={5} className={`flex justify-end items-center gap-5 `}>
            <div className=" border border-Secondary p-2 rounded-xl relative flex items-center justify-center">
              <span className="absolute -top-3 bg-white px-2 left-3">
                {content.StartDate}
              </span>
              <input
                type="date"
                value={filter.get("start_date")}
                onChange={(e) => {
                  setFilter({
                    date: filter.get("date") ? filter.get("date") : "",
                    start_date: e.target.value,
                    end_date: filter.get("end_date")
                      ? filter.get("end_date")
                      : "",
                    page: filter.get("page") ? filter.get("page") : "1",
                  });
                }}
              />
            </div>
            <div className=" border border-Secondary p-2 rounded-xl relative flex items-center justify-center">
              <span className="absolute -top-3 bg-white px-2 left-3">
                {content.EndDate}
              </span>
              <input
                type="date"
                value={filter.get("end_date")}
                onChange={(e) => {
                  setFilter({
                    date: filter.get("date") ? filter.get("date") : "",
                    end_date: e.target.value,
                    start_date: filter.get("start_date")
                      ? filter.get("start_date")
                      : "",
                    page: filter.get("page") ? filter.get("page") : "1",
                  });
                }}
              />
            </div>
          </Col>
        )}
        <Col md={4} className={"flex justify-end"}>
          <div className="border bg-Purple text-white border-Main flex space-x-2 p-2 rounded-xl max-sm:w-full">
            <select
              value={filter.get("date")}
              onChange={(e) =>
                setFilter({
                  date: e.target.value,
                  page: filter.get("page") ? filter.get("page") : "1",
                })
              }
              className="outline-none text-center bg-Purple"
            >
              <option value="" onClick={() => setFilter({})}>
                {content.All}
              </option>
              <option
                className="text-black"
                value={`${new Date().getFullYear()}-${(
                  new Date().getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${(new Date().getDate() - 1)
                  .toString()
                  .padStart(2, "0")}`}
              >
                {content.Today}
              </option>
              <option
                className="text-black"
                value={`${new Date().getFullYear()}-${(
                  new Date().getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${(new Date().getDate() - 7)
                  .toString()
                  .padStart(2, "0")}`}
              >
                {content.lastweek}
              </option>
              <option
                className="text-black"
                value={`${new Date().getFullYear()}-${new Date()
                  .getMonth()
                  .toString()
                  .padStart(2, "0")}-${new Date()
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`}
              >
                {content.LastMonth}
              </option>
              <option className="text-black" value="2000-01-01">
                {content.Specificdate}
              </option>
            </select>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DateFilter;
