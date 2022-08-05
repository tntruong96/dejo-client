import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import Sidebar from "../sidebar";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Badge, Drawer } from "antd";
import useWindowDimensions from "@utils/hooks/useWindowDimentions";
import { getItems, getTotalItems } from "@redux/store/cart/cartSlice";
import { IItemCart } from "@interfaces/cart.interface";

const routerElement = [
  {
    title: "Le Produit",
    url: "/products",
  },
  {
    title: "Le Blog",
    url: "/blog?page=1",
  },
  {
    title: "About De Jo",
    url: "/about",
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const profile: UserProfile = useSelector(selectProfile);
  const numberItemInCart = useSelector(getTotalItems);
  const itemInCart: IItemCart[] = useSelector(getItems);

  useEffect(() => {
    console.log(itemInCart);
  }, []);

  const renderNavLink = routerElement.map((route, index) => (
    <NavLink
      key={index}
      // className={`mx-5 ${router.pathname === route.url ? "active" : ""}`}
      className={`mx-5 ${
        router.pathname === route.url.replace(/\?.+/g, "") ? "active" : ""
      }`}
    >
      <Link href={route.url}>{route.title}</Link>
    </NavLink>
  ));

  const handleSidebar = () => {
    dispatch(behaveSidebar());
  };

  const handleCartAction = () => {
    if (width < 770) {
      router.push("/cart");
    } else {
      showDrawer();
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {});

  return (
    <NavContainer
      className={classNames("shadow-md grid grid-cols-4 p-5 items-center h-16")}
    >
      <BurgerContainer
        className="block md:hidden absolute"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <div className="nav-icon" onClick={handleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </BurgerContainer>
      <div className="col-start-2 col-span-2 md:col-start-1 md:col-auto flex justify-center">
        <span
          className="logo text-center text-2xl sm:text-3xl font-bold"
          onClick={() => router.push("/")}
        >
          De Jo Sai Gon
        </span>
      </div>
      <ol className="col-start-2 col-span-2 hidden md:flex justify-center items-center mb-0 ">
        {renderNavLink}
      </ol>
      <div className="grid md:grid-cols-3">
        <div className="col-span-3 flex justify-end items-center pr-5">
          <div className="hidden md:block">
            <Authentication profile={profile} />
          </div>
          <FontAwesomeIcon className="mx-2" icon={faSearch} />
          <Badge
            count={numberItemInCart}
            color="#333"
            offset={numberItemInCart >= 10 ? [9, 0] : [2, 0]}
          >
            <FontAwesomeIcon
              onClick={handleCartAction}
              className="mx-2"
              icon={faCartShopping}
            />
          </Badge>
        </div>
      </div>
      <Sidebar profile={profile} />
      <Drawer title="Your Cart" onClose={onClose} visible={visible}>
        <section>
          <div>
            {
              // itemInCart ? itemInCart.map((cart) => <div key={cart.id}>{cart.name}</div>) : null
            }
          </div>
          <div className="flex justify-around items-center">
            <div className="w-1/3">
              <button
                className="btn"
                onClick={() => {
                  router.push("/cart");
                  onClose();
                }}
              >
                View Cart
              </button>
            </div>
            <div className="w-1/3">
              <button className="btn">Check Out</button>
            </div>
          </div>
        </section>
      </Drawer>
    </NavContainer>
  );
}

export default Navbar;
