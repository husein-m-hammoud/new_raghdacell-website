import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore ,{ Pagination ,Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { fileUrl, useFETCH } from "../../Tools/APIs";
import Loading from "../../Tools/Loading";
SwiperCore.use([Autoplay, Pagination]);

const Hero = () => {
  const { data, isLoading } = useFETCH(`slider/images`);
  return (
    <div className="containerSlider">
      <div className="relative mb-2 ">
        {isLoading ? <Loading /> : ""}
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          autoplay={{
            delay: 15000, 
            disableOnInteraction: false, 
          }}
          pagination={true}
          modules={[Pagination]}
          className="mySwiper max-h-[75vh] max-sm:max-h-[40vh]"
          style={{ direction: "ltr" }}
        >
          {data?.data.data.map((e) => (
            <SwiperSlide key={e.id}>
              <img
                src={fileUrl + e.image}
                alt=""
                className=" max-h-[75vh] max-sm:max-h-[40vh] w-full object-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

 export default Hero;
