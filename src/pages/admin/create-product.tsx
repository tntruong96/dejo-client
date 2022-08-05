import React, { useEffect, useState } from "react";
import CheckboxComponent from "@components/common/checkbox";
import QuillEditor from "@components/text-editor";

import { Field, Form, Formik } from "formik";
import {
  CreateProductDTO,
  IProductCategory,
} from "@interfaces/product.interface";
import * as yup from 'yup'
import { GetStaticProps, NextPage } from "next";
import { ImageServices } from "@services/images";
import FormModal from "@components/common/form-modal";
import { Image } from "antd";
import { IImage } from "@interfaces/image.interface";
import { ProductCategories, Products } from "@services/products";
import { sizeOptionsEU } from "@configs/sizes-default";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { useRouter } from "next/router";
import { ROLE, UserProfile } from "@interfaces/authenticate.interface";

interface IFormValue {
  name: string;
  description: string;
  price: string;
  colors: [];
  sizes: [];
  images: [];
  categoryId: string;
  discount: number;
  detail: string;
}

interface PageProps {
  images: IImage[];
  categories: IProductCategory[];
}



const validateInitial = yup.object().shape({
    name: yup.string().required(),
    description : yup.string().required(),
    price: yup.string().required().min(0),
    images: yup.array().required().min(3).max(3),
    sizes: yup.array().required(),
    categoryId: yup.string().required(),
    discount: yup.number().max(100).min(0).required()
})

const CreateProduct: NextPage<PageProps> = ({ images, categories }) => {
  const route = useRouter();
  const userProfile: UserProfile = useUserProfile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(userProfile && userProfile.role !== ROLE.ADMIN){
      route.push("/login")
    }
  },[])

  const initialFormValues: IFormValue = {
    name: "",
    description: "",
    price: "",
    colors: [],
    images: [],
    sizes: [],
    categoryId: categories[0].id,
    discount: 0,
    detail: ""
  };

  const openModal = () => {
    setVisible(true);
  };

  const transformSizeValue= (sizes: string[]) => {
    return sizeOptionsEU.map(size => {
      if(sizes.some((value) => value === size.value)){
        return {label: size.label, value: true}
      } else {
        return {label: size.label, value: false}
      }
    })
  }

  const onSubmit = async (value: IFormValue) => {
   const sizesValues = transformSizeValue(value.sizes);
    try {
      const dataDTO: CreateProductDTO = {
        ...value,
        images: JSON.stringify(value.images),
        colors: "",
        price: Number(value.price),
        sizes: JSON.stringify(sizesValues),
        thumbnail: "[]"
        
      };
      console.log(dataDTO);
      const r = await Products.createProduct.fetch(dataDTO);
    } catch (error) {
        throw error
    }
  };

  const handleImagesModal = () => {
    setVisible(false);
  };

  return (
    <div className="w-full md:w-2/3 h-full p-2 md:p-16 min-h-screen">
      <Formik initialValues={initialFormValues} onSubmit={(e) => onSubmit(e)} validationSchema={validateInitial}>
        {({ errors, isValid, touched }) => (
          <Form>
            {/* Field Name */}
            <div className="w-full flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Name:
              </label>
              <Field
                className={`form-input ${
                  errors.name && touched.name ? "form-input-error" : ""
                }`}
                id="name"
                name="name"
                placeholder="Product's Name"
              />
              {errors.name && touched.name ? (
                <span className="error">{errors.name}</span>
              ) : null}
            </div>
            {/* Field Product Category */}
            <div className="w-1/3 flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Category:
              </label>
              <Field as="select" name="categoryId">
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Field>
              {errors.categoryId && touched.categoryId ? (
                <span className="error">{errors.categoryId}</span>
              ) : null}
            </div>
            {/* Field Price */}
            <div className="w-full md:w-1/3 flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Price:
              </label>
              <Field
                className={`form-input ${
                  errors.price && touched.price ? "form-input-error" : ""
                }`}
                id="price"
                name="price"
                type="number"
                placeholder="Product's Price"
              />
              {errors.price && touched.price ? (
                <span className="error">{errors.price}</span>
              ) : null}
            </div>
            {/* Field Sizes */}
            <div className="w-full flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Sizes:
              </label>
              <CheckboxComponent
                showCheckAll={true}
                name="sizes"
                items={sizeOptionsEU}
              />
              {errors.sizes && touched.sizes ? (
                <span className="error">{errors.sizes}</span>
              ) : null}
            </div>
            {/* Field Images */}
            <div className="w-1/3 flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Images:
              </label>
              <div>
                <button type="button" className="btn" onClick={openModal}>
                  Choose Images
                </button>
              </div>
              <FormModal
                onCancel={handleImagesModal}
                onCreate={handleImagesModal}
                initialValueForm
                visible={visible}
                title={"Choose Images"}
              >
                <div className="flex justify-start flex-wrap ">
                  {images.map((image) => {
                    return (
                      <div
                        key={image.id}
                        className="flex flex-col justify-center items-center m-2"
                      >
                        <Image src={image.path} width={100} height={100} alt={image.name}/>
                        <Field
                          className="mt-2"
                          type="checkbox"
                          name="images"
                          value={image.id}
                        />
                      </div>
                    );
                  })}
                </div>
              </FormModal>
              {errors.images && touched.images ? (
                <span className="error">{errors.images}</span>
              ) : null}
            </div>
            {/* Field Description */}
            <div className="w-full flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Description:
              </label>
              <QuillEditor name="description" />
              {errors.description && touched.description ? (
                <span className="error">{errors.description}</span>
              ) : null}
            </div>
            {/* Field Detail */}
            <div className="w-full flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Detail:
              </label>
              <QuillEditor name="detail" />
              {errors.detail && touched.detail ? (
                <span className="error">{errors.detail}</span>
              ) : null}
            </div>
             {/* Field discount */}
             <div className="w-full md:w-1/3 flex flex-col justify-center my-2">
              <label className="font-bold" htmlFor="title">
                Discount:
              </label>
              <Field
                className={`form-input ${
                  errors.discount && touched.discount ? "form-input-error" : ""
                }`}
                id="discount"
                name="discount"
                placeholder="Product's Discount"
                type="number"
              />
              {errors.discount && touched.discount ? (
                <span className="error">{errors.discount}</span>
              ) : null}
            </div>
            <div className="my-2 flex justify-center">
              <div className="w-52">
                <button className="btn" type="submit" disabled={!isValid}>
                  Create
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};


export default CreateProduct;


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data: images } = await ImageServices.getImages.fetch();

  const { data: categories } =
    await ProductCategories.getProductCategories.fetch();
  //   console.log(categories)

  return {
    props: {
      images: images[0],
      categories,
    },
  };
};
