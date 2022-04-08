import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { behaveSidebar, stateSidebar } from "redux/store/common/commonSlice";
import Authentication from "../authentication";
import { NavContainer, NavElement, SidebarContainer } from "./styles";

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

export const Sidebar = () => {
  const isOpenSidebar = useSelector(stateSidebar);
  const dispatch = useDispatch();

  const renderRouter = routerElement.map((e, index) => (
    <NavElement onClick={() => handleSidebar()} key={index}>
      <Link href={e.url} passHref>
        <a>{e.title}</a>
      </Link>
    </NavElement>
  ));

  const handleSidebar = () => {
    dispatch(behaveSidebar());
  };

  useEffect(() => {
    if (!isOpenSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpenSidebar]);

  return (
    <SidebarContainer className={isOpenSidebar ? "close" : ""}>
      <div className="self-end mr-2">
        <FontAwesomeIcon onClick={handleSidebar} icon={faXmark} />
      </div>
      <NavContainer>
        <ol>{renderRouter}</ol>
        <div onClick={() => handleSidebar()}>
        <Authentication />

        </div>
      </NavContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
