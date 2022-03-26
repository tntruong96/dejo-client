import { Blogs } from "@services/blogs";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { Field, Form, Formik } from "formik";
import { message } from "antd";
import {
  BlogCreateDTO,
  IBlogCategories,
  IBlogFormValue,
} from "interfaces/blog.interface";
import React, { useEffect, useState } from "react";
import * as yup from "yup";


const initialValue: IBlogFormValue = {
  title: "",
  content: "D",
  categoryId: ""
};

interface Props {
  categories: IBlogCategories[];
  [key: string]: any;
}

const validateForm = yup.object().shape({
  title: yup.string().required("Pleae fill out this field!"),
  content: yup.string().required("Pleae fill out this field!"),
  categoryId: yup.string().required("Please select one item!"),
});

const CreateBlog: React.FC<Props> = ({ categories }) => {
  const route = useRouter();
  const [content, setContent] = useState("");
  const [titleImage, setTitleImage] = useState<string | Blob>();
  const userProfile = useUserProfile();

  const onSubmit = async (values: IBlogFormValue) => {
    let imageRespone;
    message.loading({
      content: "Posting...",
      key: "loading",
    });
    try {
      if (titleImage) {
        const body = new FormData();
        body.append("file", titleImage);
        const { data } = await axios.post(
          `${process.env.URL_API}/upload-image`,
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
      const createDTO: BlogCreateDTO = {
        ...values,
        createdBy: userProfile.id,
        images: JSON.stringify([]),
      };
      createDTO.content = content;
      if(imageRespone){
        createDTO.images = JSON.stringify([imageRespone.id]);
      }
      const res = await Blogs.createBlog.fetch(createDTO);
      if (res) {
        message.destroy("loading");
        route.push("/blog");
        message.success("Success!!!", 3);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="w-full h-full p-16">
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
              <SelectFile title="Title's Image" setImageFn={setTitleImage} />
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
                <QuillEditor className="my-2" value={content} onChange={setContent}/>
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
import { GetStaticProps } from "next";
import axios from "axios";
import SelectFile from "@components/select-file";
import { useRouter } from "next/router";
import QuillEditor from "@components/text-editor";
import { Image } from "interfaces/image.interface";
import UploadImage from "@components/upload-image";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await axios.get(
    "http://dev.dejosaigon.vn/api/blog-categories"
  );
  return {
    props: {
      categories: data || [],
    },
  };
};

export default CreateBlog;
