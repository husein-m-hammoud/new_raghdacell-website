import { Link } from "react-router-dom";
import { useContextTranslate } from "../Context/ContextAPI";
import { useFETCH } from "../Tools/APIs";

const PopupNot = () => {
  const { content, profile } = useContextTranslate();
  const { data, isLoading } = useFETCH(
    `notifications?local=${localStorage.getItem("language")}`
  );
  return (
    <div className=" ">
      <div
        className={` ${
          localStorage.getItem("language") === "en"
            ? "popup-profile "
            : "popup-left "
        }
         ${
           localStorage.getItem("language") === "en"
             ? "-right-full"
             : "-left-full "
         }
 fixed z-50 transition-all top-16 w-[250px] min-h-[360px] `}
      >
        <div className=" bg-white   shadow-xl   px-4 py-2 rounded-3xl ">
          <div className="font-semibold text-2xl text-center border-b-[3px] pb-1 border-Pink  w-fit mx-auto px-5 mb-2  text-Pink">
            {content.Notfications}
          </div>
          {isLoading && profile?.new_notifications_count !== 0 ? (
            <div className="space-y-2">
              <div className="space-y-3">
                <div className="bg-slate-200 w-3/4 h-5 "></div>
                <div className="bg-slate-200 w-full h-5 "></div>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-200 w-3/4 h-5 "></div>
                <div className="bg-slate-200 w-full h-5 "></div>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-200 w-3/4 h-5 "></div>
                <div className="bg-slate-200 w-full h-5 "></div>
              </div>
            </div>
          ) : (
            data?.data.data.data
              .slice(0, profile?.new_notifications_count ? 2 : 0)
              .map((e, i) => (
                <div key={i} className="border-b border-Pink pb-3">
                  <div className=" text-Pink font-semibold">{e.title}</div>
                  <div className="text-sm">{e.description}</div>
                </div>
              ))
          )}
          <div className="text-center">
            {profile?.new_notifications_count === 0
              ? content.Therearenonewnotifications
              : ""}
          </div>
          <Link to="/Notifications">
            <div className="text-lg text-Pink font-bold cursor-pointer w-fit ml-auto">
              {content.ViewAll}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PopupNot;
