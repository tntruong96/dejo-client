import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProfile,
  isAuth,
  selectAuth,
  selectProfile,
} from "../../../redux/store/common/commonSlice";
import { UserProfile } from "../../../redux/store/common/type";
import Auth from "../../../services/auth";
import { useRouter } from "next/dist/client/router";
import { NavLink } from "./styles";
import classNames from "classnames";

const routerElement = [
  {
    title: "Le Blog",
    url: "/blog",
  },
  {
    title: "Le Produit",
    url: "/#",
  },
];

function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authen = useSelector(selectAuth);
  const profile: UserProfile = useSelector(selectProfile);

  const renderNavLink = routerElement.map((route, index) => (
    <NavLink key={index} className={`mx-5 ${router.pathname === route.url ? "active" : ""}`}>
      <Link href={route.url}>{route.title}</Link>
    </NavLink>
  ));

  const routingToDetail = () => {};

  const onLogout = async () => {
    try {
      const isLogout = await Auth.logout.fetch();
      if (isLogout) {
        dispatch(isAuth());
        dispatch(clearProfile());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={classNames("shadow-md grid grid-cols-3 p-5 items-center h-16", `${router.pathname === "/" ? "absolute w-full" : "block"}`)}>
      <div className="col-start-1" onClick={() => router.push("/")}>
        <span className="logo text-3xl font-bold">De Jo Sai Gon</span>
      </div>
      <ol className="col-start-2 flex justify-center items-center mb-0">
       {
         renderNavLink
       }
      </ol>
      <div className="col-start-3 flex justify-end items-center">
        {authen ? (
          <div>
            Welcome {profile?.userName}!
            <button
              className="mx-5 underline underline-offset-2"
              onClick={() => onLogout()}
            >
              Log out
            </button>
          </div>
        ) : (
          <>
            <Link passHref href={"/login"}>
              <a className="mx-5">
                <FontAwesomeIcon icon="user" />
              </a>
            </Link>
            <Link passHref href={"/register"}>
              <a>
                <FontAwesomeIcon icon="user-pen" />
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
