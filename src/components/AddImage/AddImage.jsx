import React from "react";
import { Col, Row } from "../../Grid-system";
import { AiOutlineCloudUpload } from "react-icons/ai";
const AddImage = ({ onChange, id, name, img, newimg, clickDelete, title }) => {
  return (
    <>
      <input
        id={id || "image"}
        type="file"
        name={name}
        onChange={onChange}
        className="hidden"
        accept="image/*"
        multiple
      />
      <div
        onClick={() => document.getElementById(id || "image").click()}
        className="w-full flex justify-between text-[#9CA3AF] border py-3 rounded-xl border-Purple px-5 cursor-pointer mx-1"
      >
        <div> {title || "Add Image"}</div>
        <div>
          <AiOutlineCloudUpload size={30} />
        </div>
      </div>
      <Row justify="center" className="pt-3">
        {img && (
          <Col col={6}>
            <img src={img} alt="" className="w-full h-[250px] rounded-2xl " />
          </Col>
        )}
        {newimg && (
          <Col col={6}>
            <div className="relative">
              <span
                onClick={clickDelete}
                className="bg-red-700 w-6 h-6 flex justify-center items-center font-bold text-white cursor-pointer -top-2 rounded-full absolute"
              >
                X
              </span>
              <img
                src={newimg}
                alt=""
                className="w-full h-[250px] rounded-2xl"
              />
            </div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default AddImage;
