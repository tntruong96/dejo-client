import React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { ILogin } from "../interfaces/authenticate.interface";
import { useRouter } from "next/router";
import Auth from "../services/auth";
import { useDispatch } from "react-redux";
import {
  clearProfile,
  isAuth,
  saveProfile,
} from "../redux/store/common/commonSlice";
import idleTimer from "@utils/idleTimer";
import * as yup from 'yup';
import {m} from 'framer-motion';

const validateForm = yup.object().shape({
  userName:yup.string().required("Please fill out username!!"),
  password: yup.string().required("Please fill out password!!")
})

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values: ILogin) => {
    const user = await Auth.login.fetch(values);
    if (user) {
      const profile = await Auth.profile.fetch();
      dispatch(saveProfile(profile.data));
      dispatch(isAuth());
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
  };

  return (
    <m.div className="min-h-screen">
      <div className="flex relative justify-center">
        <Formik
          validationSchema={validateForm}
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
          {({ isValid, touched, errors }) => (
            <Form className="flex flex-col justify-center items-center form mt-52 shadow-2xl">
              <div className="form-group">
                {/* <label htmlFor="username">Username:</label> */}
                <Field
                  className="form-input shadow-md"
                  id="userName"
                  name="userName"
                  placeholder="Username..."
                />
                {errors.userName && touched.userName && (<div className="error">{errors.userName}</div>)}
              </div>
              <div className="form-group">
                {/* <label htmlFor="password">Password:</label> */}
                <Field
                  className="form-input shadow-md"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password..."
                  />
                  {errors.password && touched.password && (<div className="error">{errors.password}</div>)}
              </div>
              <button disabled={!isValid} className="btn" type="submit">
                Log in
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </m.div>
  );
}

export default Login;
