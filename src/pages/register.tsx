import React from "react";
import PropTypes from "prop-types";
import { Formik, FormikHelpers, Field, Form } from "formik";
import { IRegister } from "../interfaces/authenticate.interface";
import Auth from "../services/auth";
import { useRouter } from "next/router";
import * as yup from "yup";
import classNames from "classnames";
import {motion} from 'framer-motion';

const schemaValidate = yup.object().shape({
  userName: yup
    .string()
    .min(6, "At least 6 characters")
    .max(50, "Max character is 50")
    .required("Require"),
  firstName: yup.string().required("Require").max(50, "Max character is 50"),
  lastName: yup.string().required("Require").max(50, "Max character is 50"),
  email: yup.string().required("Require").email("Invalid Email"),
  phone: yup.string().required("Require"),
  password: yup.string().required("Require"),
  passwordConfirm: yup
    .string()
    .required("Require")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

function Register() {
  const router = useRouter();
  const onSubmit = async (values: IRegister) => {
    const confirmPassword = values.password === values.passwordConfirm;
    if (confirmPassword) {
      const respone = await Auth.register.fetch(values);
      if (respone && respone.data) {
        router.push("/login");
      }
    }
  };

  return (
    <motion.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity:1}} className="min-h-screen">
      <div className="flex justify-center mt-32">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            passwordConfirm: "",
            email: "",
            phone: "",
          }}
          validationSchema={schemaValidate}
          onSubmit={(
            values: IRegister,
            { setSubmitting }: FormikHelpers<IRegister>
          ) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form className="flex flex-col justify-center items-center form w-2/3 md:w-4/12 shadow-2xl">
              <div className="form-group ">
                <Field
                  className={classNames(
                    "form-input shadow-md",
                    touched.userName && errors.userName && "form-input-error"
                  )}
                  id="userName"
                  name="userName"
                  placeholder="Username..."
                />
                {touched.userName && errors.userName && (
                  <div className="error">{errors.userName}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  className={classNames(
                    "form-input shadow-md",
                    touched.firstName && errors.firstName && "form-input-error"
                  )}
                  id="firstName"
                  name="firstName"
                  placeholder="Firstname..."
                />
                {touched.firstName && errors.firstName && (
                  <div className="error">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  className={classNames(
                    "form-input shadow-md",
                    touched.lastName && errors.lastName && "form-input-error"
                  )}
                  id="lastName"
                  name="lastName"
                  placeholder="Lastname..."
                />
                {touched.lastName && errors.lastName && (
                  <div className="error">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  className={classNames(
                    "form-input shadow-md",
                    touched.password && errors.password && "form-input-error"
                  )}
                  id="password"
                  name="password"
                  placeholder="Password..."
                />
                {touched.password && errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  type="password"
                  className={classNames(
                    "form-input shadow-md",
                    touched.passwordConfirm &&
                      errors.passwordConfirm &&
                      "form-input-error"
                  )}
                  id="passwordConfirm"
                  name="passwordConfirm"
                  placeholder="Password Again..."
                />
                {touched.passwordConfirm && errors.passwordConfirm && (
                  <div className="error">{errors.passwordConfirm}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  className={classNames(
                    "form-input shadow-md",
                    touched.phone && errors.phone && "form-input-error"
                  )}
                  id="phone"
                  name="phone"
                  placeholder="Phone Number..."
                />
                {touched.phone && errors.phone && (
                  <div className="error">{errors.phone}</div>
                )}
              </div>
              <div className="form-group">
                <Field
                  type="email"
                  className={classNames(
                    "form-input shadow-md",
                    touched.email && errors.email && "form-input-error"
                  )}
                  id="email"
                  name="email"
                  placeholder="Email..."
                />
                {touched.email && errors.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>
              <button disabled={!isValid} className="btn" type="submit">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}

export default Register;
