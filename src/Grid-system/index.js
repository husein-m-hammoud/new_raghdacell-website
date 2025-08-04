import "./style.css";
export const Col = ({
  md,
  lg,
  sm,
  xl,
  xs,
  col,
  children,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`col-${col} col-lg-${lg} col-md-${md} col-xs-${xs} mb-2 col-sm-${sm} col-xl-${xl} ${className}`}
    >
      {children}
    </div>
  );
};
export const Row = ({ children, className, gap, justify, ref }) => {
  return (
    <div
      ref={ref}
      className={` row ${"gap-" + gap} ${className} justify-${justify}`}
    >
      {children}
    </div>
  );
};
export const Container = ({ children }) => {
  return (
    <section className="py-5">
      <div className="w-[90%] mx-auto container ">{children}</div>
    </section>
  );
};
