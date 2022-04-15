import { notification } from "antd";
import axios, { AxiosError } from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { IFormCreateCategory } from "interfaces/category.interface";
import {  StatusCode, StatusMessage } from "interfaces/status.interface";
import React from "react";
import * as yup from "yup";

const validate = yup.object().shape({
  name: yup.string().required(StatusMessage.REQUIRED),
});

const initialValue: IFormCreateCategory = {
  name: "",
};

const CreateCategory = () => {
  const handleSubmit = async (values: IFormCreateCategory, actions: FormikHelpers<IFormCreateCategory>) => {
    try {
      const {data, status} = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/blog-categories/create-new`, values
      );
      if(status === StatusCode.SUCCESS){
        notification.success({message:"SUCCESS", description: StatusMessage.SUCCESS});
        actions.setSubmitting(false);
        actions.resetForm({
          values:{
            name: ''
          }
        });
        
      }
    } catch (error) {
     const {response} = error as AxiosError;
     let message  = StatusMessage.INTERNAL
     if(response?.data?.code === StatusCode.DUPLICATED){
      message = StatusMessage.DUPLICATED
     }
     notification.error({message: "ERROR", description: message, duration: 2})
    }

  };

  return (
    <div className="p-5 min-h-screen">
      <Formik
        initialValues={initialValue}
        onSubmit={(values, actions) => handleSubmit(values,actions)}
        validationSchema={validate}
      >
        {({ isValid, errors, touched }) => (
          <Form className="w-full  flex flex-col items-center">
            <div className="form-group">
              <label className="font-semibold" htmlFor="name">
                Category Name:
              </label>
              <Field className="form-input" name="name"></Field>
              {errors.name && touched && (
                <div className="error">{errors.name}</div>
              )}
            </div>
            <div className="w-32">
              <button type="submit" disabled={!isValid} className="btn">
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategory;
