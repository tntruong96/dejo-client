import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { IBlog, IBlogCategories, IBlogCreateDTO, IBlogFormValue } from "interfaces/blog.interface";
import SelectFile from "@components/blogs/select-file";
import QuillEditor from "@components/text-editor";
import { useRouter } from "next/router";

const validateForm = yup.object().shape({
  title: yup.string().required("It's required!"),
});

interface Props {
    categories: IBlogCategories[];
    blogDetail: IBlog;
    [key: string]: any;
}

const UpdateBlog: React.FC<Props> = ({ blogDetail, categories }) => {
  const router = useRouter();  
  const { title, content, category } = blogDetail;
  const initialValue: IBlogFormValue = {
    title: title,
    categoryId: category.id.toString(),
    content,
    titleImage: [],
  };
  console.log(blogDetail);

  const handleSubmit = async (values: IBlogFormValue) => {
      const {titleImage,  categoryId ,...rest} = values;
      let imageRespone;
      /* Upload image */
      if(titleImage.length){
        const body = new FormData();
        body.append("file", titleImage[0]);
        try {
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
        } catch (error) {
            console.log(error);
        }
      }
      try {
        const updateDTO: IBlogCreateDTO = {
            ...rest,
            category: Number.parseInt(categoryId),
            createdBy: blogDetail.createdBy.id,
            images: imageRespone ? JSON.stringify([imageRespone.id]) : blogDetail.images
      }
      const {data} = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/blog/update/${blogDetail.id}`, updateDTO);
      if(data){
        router.push({
            pathname:"/blog",
            query: {
                page: 1
            }
        })
      }
      } catch (error) {
          console.log(error);
      }
  };

  return (
    <div className="p-2 md:p-16 w-full h-full min-h-screen">
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validateForm}
      >
        {({ errors, touched, isValid }) => (
          <Form className="flex flex-col items-center w-full md:w-2/3">
            <div className="w-full flex flex-col justify-center">
              <label className="font-bold" htmlFor="title">
                Title:{" "}
              </label>
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
              <SelectFile name="titleImage" label="Title's Image" />
              {/* <UploadImage label={"Title Image"} onChange={setTitleImage} /> */}
            </div>
            <div className="w-1/3 self-start my-2">
              <div className="mb-3 flex flex-col">
                <label htmlFor="category" className="font-bold">
                  Category:{" "}
                </label>
                <Field
                  id="categoryId"
                  name="categoryId"
                  component="select"
                  placeholder="Blog's Category"
                  className="my-2"
                >
                  {categories.map((category) => (
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
              <label htmlFor="content" className="font-bold">
                Content:
              </label>
              <QuillEditor className="my-2" name="content" />
              {errors.content ? <span>{errors.content}</span> : null}
            </div>
            <div className="w-32">
              <button className="btn" type="submit" disabled={!isValid}>
                Update Blog
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { data: blogDetail } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog/${query.slug}`
  );
  const { data: categories } = await axios.get(
    `${process.env.URL_API}/blog-categories`
  );

  return {
    props: {
      blogDetail,
      categories,
    },
  };
};

export default UpdateBlog;
