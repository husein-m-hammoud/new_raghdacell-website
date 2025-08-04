import React from "react";
import { Container, Loading, TitleTwo } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useContextTranslate } from "../../Context/ContextAPI";
import Delete from "../../images/delete (1).png";
import { useFETCH } from "../../Tools/APIs";
import Pagination from "../../Tools/Pagination";

const Notifications = () => {
  const { content } = useContextTranslate();
  const { data, isLoading, deleteItem } = useFETCH(
    `notifications?local=${localStorage.getItem("language")}`,
    "notifications"
  );
  return (
    <section className="py-4 min-h-[50vh]">
      <TitleTwo title={content.Notifications} />

      <Container>
        {isLoading ? <Loading /> : ""}
        {data?.data.data.data == 0 ? (
          <p className="h-[60vh] flex justify-center items-center text-2xl font-semibold text-center">
            {content.Therearenonotificationstoshow}
          </p>
        ) : (
          <Pagination
            pageCount={Math.ceil(
              data?.data.data.total / data?.data.data.per_page
            )}
          >
            <Row justify="center">
              {data?.data.data.data.map((e, i) => (
                <Col md={5} key={i}>
                  <div className="border  border-Pink rounded-2xl text-center p-4 h-full">
                    <img
                      src={Delete}
                      alt=""
                      className="ml-auto"
                      onClick={() => deleteItem(e)}
                    />
                    <div className="text-xl text-Pink font-semibold p-4">
                      {e.title}
                    </div>
                    <div className="mb-3">{e.description}</div>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink">
                        {content.Date}:
                      </div>
                      <div className="">{e.date}</div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink">
                        {content.Time} :
                      </div>
                      <div className="">{e.time}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Pagination>
        )}
      </Container>
    </section>
  );
};

export default Notifications;
