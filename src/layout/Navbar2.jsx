import React from "react";
import { useContextTranslate } from "../Context/ContextAPI";
import { NavLink } from "react-router-dom";
import { Container } from "../components";

const Navbar2 = () => {
  const { content } = useContextTranslate();
  return (
    <div className="bg-Pink sticky top-0 left-0 z-20 w-full">
      <Container>
        <ul
          className={` flex flex-1 py-2 gap-4 text-white justify-center max-sm:text-xs text-xl font-semibold  `}
        >
          <li className="hover:text-Purple  ">
            <NavLink to="/">{content.home}</NavLink>
          </li>
          {localStorage.getItem("token") && (
            <>
              {" "}
              <li className="hover:text-Purple  ">
                <NavLink to="/Orders">{content.Orders}</NavLink>
              </li>{" "}
              <li className="hover:text-Purple  ">
                <NavLink to="/charging-the-wallet">
                  {content.Charging}
                </NavLink>
              </li>
            </>
          )}
          {/* <li className="hover:text-Purple  ">
            <NavLink to="/products">{content.products}</NavLink>
          </li> */}
          <li className="hover:text-Purple  ">
            <NavLink to="/about-us">{content.aboutUs}</NavLink>
          </li>
          <li className="hover:text-Purple ">
            <NavLink to="/contact-us">{content.ContactUs}</NavLink>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Navbar2;
