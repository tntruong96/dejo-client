import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  behaveSidebar,
  clearProfile,
  isAuth,
  selectAuth,
  selectProfile,
} from "../../../redux/store/common/commonSlice";
import { UserProfile } from "../../../redux/store/common/type";
import Auth from "../../../services/auth";
import { useRouter } from "next/dist/client/router";
import { BurgerContainer, NavContainer, NavLink } from "./styles";
import classNames from "classnames";
import Authentication from "../authentication";

const routerElement = [
  {
    title: "Le Blog",
    url: "/blog?page=1",
  },
  {
    title: "Le Produit",
    url: "/#",
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);

  const renderNavLink = routerElement.map((route, index) => (
    <NavLink
      key={index}
      className={`mx-5 ${router.pathname === route.url ? "active" : ""}`}
    >
      <Link href={route.url}>{route.title}</Link>
    </NavLink>
  ));

  const handleSidebar = () => {
    dispatch(behaveSidebar());
  };

  const routingToDetail = () => {};

  return (
    <NavContainer
      className={classNames(
        "shadow-md grid grid-cols-1 sm:grid-cols-3 p-5 items-center h-16"
      )}
    >
      <BurgerContainer
        className="block sm:hidden absolute"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <div className="nav-icon" onClick={handleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </BurgerContainer>
      <div
        className="col-start-1 flex justify-center"
        onClick={() => router.push("/")}
      >
        <span className="logo text-center text-3xl font-bold">
          De Jo Sai Gon
        </span>
      </div>
      <ol className="col-start-2 hidden sm:flex justify-center items-center mb-0 ">
        {renderNavLink}
      </ol>
      <div className="hidden sm:block">
        <Authentication />
      </div>
    </NavContainer>
  );
}

export default Navbar;
