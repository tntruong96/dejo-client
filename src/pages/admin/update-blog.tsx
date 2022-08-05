import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
  IBlog,
  IBlogCategories,
  IBlogCreateDTO,
  IBlogFormValue,
} from "@interfaces/blog.interface";
import SelectFile from "@components/blogs/select-file";
import QuillEditor from "@components/text-editor";
import { useRouter } from "next/router";
import { Image, Modal } from "antd";
import { ImageServices } from "@services/images";
import { IImage } from "@interfaces/image.interface";
import { Blogs } from "@services/blogs";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { ROLE } from "@interfaces/authenticate.interface";

const validateForm = yup.object().shape({
  title: yup.string().required("It's required!"),
});

interface Props {
  categories: IBlogCategories[];
  blogDetail: IBlog;
  images: IImage[];
  [key: string]: any;
}

const UpdateBlog: React.FC<Props> = ({ blogDetail, categories, images }) => {
  const userProfile = useUserProfile();
  const route = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(userProfile && userProfile.role !== ROLE.ADMIN){
      route.push('/login')
    }
  }, [userProfile])

  const { title, content, category, thumbnailPath, thumbnail,shortContent  } = blogDetail;
  const initialValue: IBlogFormValue = {
    title: title,
    categoryId: category.id,
    content,
    thumbnail: JSON.parse(thumbnail)[0],
    shortContent
  };
  console.log(initialValue);

  const handleSubmit = async (values: IBlogFormValue) => {
    const { thumbnail, categoryId, ...rest } = values;
    try {
      const updateDTO: IBlogCreateDTO = {
        ...rest,
        category: categoryId,
        createdBy: blogDetail.createdBy.id,
        thumbnail: JSON.stringify([thumbnail]),
      };
      const { data } = await Blogs.updateBlog.fetch(blogDetail.id, updateDTO);

      if (data) {
        route.push({
          pathname: `/blog-detail/${blogDetail.slug}`,
          query: {
            page: 1,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
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
                Title:
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
              {/* <SelectFile name="titleImage" label="Title's Image" /> */}
              {/* <UploadImage label={"Title Image"} onChange={setTitleImage} /> */}
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
                                width={200}
                                height={200}
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
                  {categories.map((category) => (
                    <option  key={category.id} value={category.id} defaultValue={blogDetail.category.id}>
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
  // console.log(ctx);
  const { data: blogDetail } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog/${query.slug}`
  );
  const { data: categories } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog-categories`
  );

  const { data: images } = await ImageServices.getImages.fetch();

  return {
    props: {
      blogDetail,
      categories,
      images: images[0],
    },
  };
};

export default UpdateBlog;
