import { Blogs } from "@services/blogs";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { Field, Form, Formik, useFormikContext } from "formik";
import { message, Form as FormAntd, Radio, Image, Modal } from "antd";
import {
  IBlogCreateDTO,
  IBlogCategories,
  IBlogFormValue,
} from "@interfaces/blog.interface";
import React, { useRef, useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import QuillEditor from "@components/text-editor";
import * as yup from "yup";
import { ImageServices } from "@services/images";
import { IImage } from "@interfaces/image.interface";
import { useEffect } from "react";
import { ROLE } from "@interfaces/authenticate.interface";

const initialValue: IBlogFormValue = {
  title: "",
  content: "",
  categoryId: "",
  thumbnail: "",
  shortContent: ""
};

interface Props {
  categories: IBlogCategories[];
  images: IImage[];
  [key: string]: any;
}

const validateForm = yup.object().shape({
  title: yup.string().required("Please fill out this field!"),
  content: yup.string().required("Please fill out this field!"),
  categoryId: yup.string().required("Please select one item!"),
  thumbnail: yup.string().required("Please choose image!"),
  shortContent: yup.string().required("Please fill out this field!")
});

const CreateBlog: React.FC<Props> = ({ categories, images }) => {
  const route = useRouter();
  const userProfile = useUserProfile();
  const [visible, setVisible] = useState(false);
  const [thumbnail, setThumbnail] = useState();
  const ref = useRef();

  useEffect(() => {
    if (userProfile && userProfile.role !== ROLE.ADMIN) {
      route.push("/login");
    }
  }, [userProfile]);

  // console.log(images);

  const onSubmit = async (values: IBlogFormValue) => {
    const { thumbnail, categoryId, shortContent,...rest } = values;
    let imageRespone;
    message.loading({
      content: "Posting...",
      key: "loading",
    });
    try {
      const createDTO: IBlogCreateDTO = {
        ...rest,
        category: categoryId,
        createdBy: userProfile.id,
        thumbnail: JSON.stringify([thumbnail]),
        shortContent: shortContent+"..."
      };
      console.log(createDTO);
      const res = await Blogs.createBlog.fetch(createDTO);
      if (res) {
        message.destroy("loading");
        route.push({
          pathname: "/blog",
          query: {
            page: 1,
          },
        });
        message.success("Success!!!", 3);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
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
              {/* <SelectFile  name="titleImage" label="Title's Image"  />
              <UploadImage label={"Title Image"} onChange={setTitleImage}/> */}
              <label htmlFor="thumbnail" className="font-bold">
                Thumbnail:
              </label>
               
              <div>
                <div className="w-32">
                  <button type="button" className="btn" onClick={showModal}>
                    Choose Images
                  </button>
                </div>
                {errors.thumbnail && (
                  <span className="error">{errors.thumbnail}</span>
                )}
                <Modal visible={visible} onOk={onCancel} onCancel={onCancel}>
                  <div role="group">
                    <div className="flex justify-start items-center w-full flex-wrap">
                      {images.length &&
                        images.map((image, index) => {
                          return (
                            <div key={image.id} className="flex flex-col justify-center items-center m-4">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_URL_WEB}/${image.path}`}
                                width={150}
                                height={150}
                                className="pb-2"
                                alt={image.name}
                              />
                              <Field
                                type="radio"
                                name="thumbnail"
                                key={index}
                                value={image.id}
                              ></Field>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Modal>
              </div>
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
              <label htmlFor="content" className="font-bold">
                 Content:
              </label>
              <QuillEditor className="my-2" name="content" />
              {/* {errors.content ? <span>{errors.content}</span> : null} */}
            </div>
            <div className="w-full flex flex-col my-2">
              <label htmlFor="content" className="font-bold">
              Short Content:
              </label>
              <Field
                className={`form-input ${
                  errors.shortContent && touched.shortContent ? "form-input-error" : ""
                }`}
                as="textarea"
                name="shortContent"
                placeholder="Short Content"
              />
              {errors.shortContent ? <span className="error">{errors.shortContent}</span> : null}
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
  const { data: categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog-categories`
  );
  const { data: images } = await ImageServices.getImages.fetch();

  return {
    props: {
      categories: categories || [],
      images: images[0] || [],
    },
  };
};

export default CreateBlog;
