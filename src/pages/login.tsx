import React from "react";
import PropTypes from "prop-types";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { ILogin } from "../interfaces/authenticate.interface";
import { caxios } from "../utils/axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import Auth from "../services/auth";
import { useDispatch } from "react-redux";
import { clearProfile, isAuth, saveProfile } from "../redux/store/common/commonSlice";
import idleTimer from "@utils/idleTimer";

Login.propTypes = {};

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values: ILogin) => {
   const user = await Auth.login.fetch(values);
    if(user){
      const profile = await Auth.profile.fetch();
      dispatch(saveProfile(profile.data))
      dispatch(isAuth())
      idleTimer(logOutCB);
      router.push("/");
    }
  };

  const logOutCB = async () => {
    try {
      const isLogout = await Auth.logout.fetch();
      if (isLogout) {
        dispatch(isAuth());
        dispatch(clearProfile());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex relative justify-center">
      <Formik
        initialValues={{
          userName: "",
          password: "",
        }}
        onSubmit={(
          values: ILogin,
          { setSubmitting }: FormikHelpers<ILogin>
        ) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({isValid, touched, errors}) => (
          <Form className="flex flex-col justify-center items-center form mt-52 shadow-2xl">
            <div className="form-group">
              {/* <label htmlFor="username">Username:</label> */}
              <Field
                className="form-input shadow-md"
                id="userName"
                name="userName"
                placeholder="Username..."
              />
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password:</label> */}
              <Field
                className="form-input shadow-md"
                id="password"
                name="password"
                placeholder="Password..."
              />
            </div>
            <button disabled={!isValid} className="btn" type="submit">
              Log in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
