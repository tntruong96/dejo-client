import React from "react";
import PropTypes from "prop-types";
import { AuthenticationContainer } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProfile,
  isAuth,
  selectAuth,
  selectProfile,
} from "../../../redux/store/common/commonSlice";
import { UserProfile } from "../../../redux/store/common/type";
import Auth from "@services/auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownComponent from "../dropdown";
import { Menu } from "antd";
import { faAngleDown, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ROLE } from "@interfaces/authenticate.interface";

interface Props {
  profile: UserProfile
}

const Authentication: React.FC<Props> = ({profile}) => {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuth);
  const router = useRouter();

  const menu = (
    <Menu
      onClick={({ key, keyPath, domEvent }) => {
        if (key === ROLE.ADMIN) {
        profile && profile.role === ROLE.ADMIN ? router.push(`/${key}`) : router.push("/login")
        } else if (key==="log-out"){
          onLogout();
        }else {
          router.push(`/${key}`);
        }
      }}
      items={[
        {
          label: "Profile",
          key: "profile",
        },
        {
          label: "Admin Dashboard",
          key: "admin",
        },
        {
          label: "Log Out",
          key: "log-out",
        },
      ]}
    />
  );

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
    <AuthenticationContainer className="col-start-3 md:flex justify-start items-center">
      {authen ? (
        <div className="flex cursor-pointer">
          {`${profile?.userName}`}
          <div className="ml-2">
            <DropdownComponent trigger={['click', 'hover']} overlay={menu}>
              <FontAwesomeIcon icon={faAngleDown} />
            </DropdownComponent>
          </div>
        </div>
      ) : (
        <div className="">
          <Link passHref href={"/login"}>
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
