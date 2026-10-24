import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContextTranslate } from "../Context/ContextAPI";

const PIN_EXEMPT_PATHS = [
  "/set-pin",
  "/verify-pin",
  "/forget-pin",
  "/reset-pin",
];

const PinGate = () => {
  const { profile } = useContextTranslate();
  const { pathname } = useLocation();

  if (!localStorage.getItem("token")) return <Outlet />;
  if (PIN_EXEMPT_PATHS.includes(pathname)) return <Outlet />;
  if (!profile || Object.keys(profile).length === 0) return <Outlet />;

  if (profile.has_pin === false) {
    return <Navigate to="/set-pin" replace />;
  }
  if (profile.has_pin && sessionStorage.getItem("pin_verified") !== "1") {
    return <Navigate to="/verify-pin" replace />;
  }
  return <Outlet />;
};

export default PinGate;
