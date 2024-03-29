import { Blogs } from "@services/blogs";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { Field, Form, Formik } from "formik";
import { message } from "antd";
import {
  IBlogCreateDTO,
  IBlogCategories,
  IBlogFormValue,
} from "interfaces/blog.interface";
import React from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import SelectFile from "@components/blogs/select-file";
import { useRouter } from "next/router";
import QuillEditor from "@components/text-editor";
import * as yup from "yup";


const initialValue: IBlogFormValue = {
  title: "",
  content: "",
  categoryId: "",
  titleImage: [],
};

interface Props {
  categories: IBlogCategories[];
  [key: string]: any;
}

const validateForm = yup.object().shape({
  title: yup.string().required("Please fill out this field!"),
  content: yup.string().required("Please fill out this field!"),
  categoryId: yup.string().required("Please select one item!"),
  titleImage: yup.array().min(1, "Please choose image!")
});

const CreateBlog: React.FC<Props> = ({ categories }) => {
  const route = useRouter();
  const userProfile = useUserProfile();


  const onSubmit = async (values: IBlogFormValue) => {
    const {titleImage, categoryId, ...rest} = values;
    let imageRespone;
    message.loading({
      content: "Posting...",
      key: "loading",
    });
    try {
      if (titleImage) {
        const body = new FormData();
        body.append("file", titleImage[0]);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_URL_API}/upload-image`,
          body,
          {
            method: "POST",
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        imageRespone = data;
      }
      const createDTO: IBlogCreateDTO = {
        ...rest,
        category:Number.parseInt(categoryId),
        createdBy: userProfile.id,
        images: JSON.stringify([]),
      };
      if(imageRespone){
        createDTO.images = JSON.stringify([imageRespone.id]);
      }
      const res = await Blogs.createBlog.fetch(createDTO);
      if (res) {
        message.destroy("loading");
        route.push({
          pathname:"/blog",
          query: {
            page: 1
          }
        });
        message.success("Success!!!", 3);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="w-full md:w-2/3 h-full p-2 md:p-16 min-h-screen">
      <Formik
        initialValues={initialValue}
        validationSchema={validateForm}
        onSubmit={(value, actions) => {
          onSubmit(value);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isValid }) => (
          <Form className="flex flex-col items-center">
            <div className="w-full flex flex-col justify-center">
              <label className="font-bold" htmlFor="title">Title: </label>
              <Field
                className={`form-input ${
                  errors.title && touched.title ? "form-input-error" : ""
                }`}
                id="title"
                name="title"
                placeholder="Blog's Title"
              />
              {errors.title && touched.title ? (
                <span className="error">{errors.title}</span>
              ) : null}
            </div>
            <div className="w-full flex flex-col justify-center">
              <SelectFile  name="titleImage" label="Title's Image"  />
              {/* <UploadImage label={"Title Image"} onChange={setTitleImage}/> */}
            </div>
            <div className="w-1/3 self-start my-2">
              <div className="mb-3 flex flex-col">
                <label htmlFor="category" className="font-bold">Category: </label>
                <Field
                  id="categoryId"
                  name="categoryId"
                  component="select"
                  placeholder="Blog's Category"
                  className="my-2"
                >
                  <option value={""}>Select Category</option>
                  {categories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>
              {errors.categoryId && touched.categoryId ? (
                <span className="error">{errors.categoryId}</span>
              ) : null}
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="content" className="font-bold">Content:</label>
                <QuillEditor className="my-2" name="content"/>
              {/* {errors.content ? <span>{errors.content}</span> : null} */}
            </div>
            <div className="w-32">
              <button className="btn" type="submit" disabled={!isValid}>
                Create Blog
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog-categories`
  );
  return {
    props: {
      categories: data || [],
    },
  };
};

export default CreateBlog;
