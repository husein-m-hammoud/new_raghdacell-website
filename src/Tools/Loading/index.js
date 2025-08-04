import "./Loading.css";

const Loading = () => {
  return (
    <div className="absolute w-full h-full bg-[#ffffff77] top-0 left-0 z-[25]">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
