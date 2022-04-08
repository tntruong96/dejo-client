import React from "react";
import PropTypes from "prop-types";
import { AuthenticationContainer } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile, isAuth, selectAuth, selectProfile } from "redux/store/common/commonSlice";
import { UserProfile } from "redux/store/common/type";
import Auth from "@services/auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Authentication = () => {
  const dispatch = useDispatch();  
  const authen = useSelector(selectAuth);
  const profile: UserProfile = useSelector(selectProfile);
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
    <AuthenticationContainer className="col-start-3 flex justify-end items-center">
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
          <div className="">
            <Link  passHref href={"/login"}>
              <a className="mx-2">
                <FontAwesomeIcon icon="user" />
              </a>
            </Link>
            <Link passHref href={"/register"}>
              <a className="mx-2">
                <FontAwesomeIcon icon="user-pen" />
              </a>
            </Link>
          </div>
        )}
    </AuthenticationContainer>
  );
};

export default Authentication;
