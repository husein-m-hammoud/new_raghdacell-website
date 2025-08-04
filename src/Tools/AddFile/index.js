import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Col, Row } from "../../Grid-system";
const AddImage = ({
  type,
  id,
  title,
  name,
  accept,
  onChange,
  oldImage,
  newImage,
  oldPDF,
  newPDF,
  oldVideo,
  newVideo,
  newImages,
  clickDeleteImage,
  clickDeleteImages,
  clickDeleteVideo,
}) => {
  return (
    <>
      <input
        id={id || "image"}
        type="file"
        name={name}
        onChange={onChange}
        className="hidden"
        accept={
          type === "IMAGES"
            ? "image/*"
            : type === "VIDEO"
            ? "video/*"
            : type === "PDF"
            ? "application/pdf"
            : accept
            ? accept
            : "image/*"
        }
      />
      <div
        onClick={() => document.getElementById(id || "image").click()}
        className="w-full flex justify-between text-[#9CA3AF] border my-2 py-3 rounded-xl border-Purple px-5 cursor-pointer mx-1"
      >
        <div> {title || "أضف صورة"}</div>
        <div>
          <AiOutlineCloudUpload size={30} />
        </div>
      </div>
      {type === "IMAGES" && newImages ? (
        <Row className="py-4">
          {newImages &&
            newImages?.map((e, i) => (
              <Col md={3} xs={4} sm={6} lg={24} key={i}>
                <div className="relative">
                  <span
                    onClick={clickDeleteImages}
                    className="bg-red-700 w-6 h-6 flex justify-center items-center font-bold text-white cursor-pointer z-10 -top-2 rounded-full absolute"
                  >
                    X
                  </span>
                  <img src={e} alt="" className="w-full rounded-2xl" />
                </div>
              </Col>
            ))}
        </Row>
      ) : type === "VIDEO" && (oldVideo || newVideo) ? (
        <Row>
          {oldVideo && (
            <Col md={6}>
              <video controls className="rounded-2xl">
                <source src={oldVideo} />
              </video>
            </Col>
          )}
          {newVideo && (
            <Col md={6}>
              <div className="relative">
                <span
                  onClick={clickDeleteVideo}
                  className="bg-red-700 w-6 h-6 flex justify-center items-center font-bold text-white cursor-pointer z-10 -top-2 rounded-full absolute"
                >
                  X
                </span>
                <video controls className="rounded-2xl">
                  <source src={newVideo} />
                </video>
              </div>
            </Col>
          )}
        </Row>
      ) : type === "PDF" && (oldPDF || newPDF) ? (
        <Row>
          {oldPDF && (
            <Col xm={6}>
              <a href={oldPDF}>عرض الملف القديم</a>
            </Col>
          )}
          {newPDF && <Col xm={6}>{newPDF}</Col>}
        </Row>
      ) : (
        <Row justify="center" className="pt-3">
          {newImage && (
            <Col col={6}>
              <div className="relative">
                <span
                  onClick={clickDeleteImage}
                  className="bg-red-700 w-6 h-6 flex justify-center items-center font-bold text-white cursor-pointer z-10 -top-2 rounded-full absolute"
                >
                  X
                </span>
                <img
                  src={newImage}
                  alt=""
                  className="w-full h-[250px] rounded-2xl"
                />
              </div>
            </Col>
          )}
          {oldImage && (
            <Col col={6}>
              <image
                src={oldImage}
                alt=""
                className="w-full h-[250px] rounded-2xl"
              />
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default AddImage;
