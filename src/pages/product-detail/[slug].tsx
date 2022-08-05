import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import { Button, Modal, Tabs } from "antd";
import { TabPane } from "rc-tabs";
import { Field, Form, Formik } from "formik";
import { IProduct } from "@interfaces/product.interface";
import { FormatCurrency } from "@utils/formatCurrency";
import size_guide from "../../../public/images/size_guide.jpg";
import styles from "../../styles/modules/ProductDetail.module.scss";
import { useModuleClassNames } from "@utils/hooks/useStyle";
import { Image as ImageAntd } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addItem, countTotal, getItems } from "@redux/store/cart/cartSlice";
import { IItemCart, IItemDetail } from "@interfaces/cart.interface";

type Props = {
  detail: IProduct;
};

interface ISize {
  label: string;
  value: boolean;
}

const ProductDetail: NextPage<Props> = ({ detail }) => {
  const ditpatch = useDispatch();
  const sizes: ISize[] = JSON.parse(detail.sizes);
  const initialSize = sizes.find((size) => size.value);
  const initialSizePicked = initialSize ? initialSize.label : "";
  const [sizeChecked, setSizeChecked] = useState<string>(initialSizePicked);
  const [visible, setVisible] = useState<boolean>(false);
  const classname = useModuleClassNames(styles);
  const imagesPaths: string[] = JSON.parse(detail.images);
  const PreviewGroup = ImageAntd.PreviewGroup;
  const itemCartStored: IItemCart[] = useSelector(getItems);

  const addProduct = () => {
    const { id,slug, name, price, discount, images } = detail;

    const itemDetail: IItemDetail = {
      slug,
      name,
      price,
      id,
      discount,
      images,
      size: Number(sizeChecked),
    };
    
    const itemCart:IItemCart = {
      id:Math.random().toString(16).slice(2),
      totalPrice: Number(price),
      itemDetail,
      count: 1
    }

    ditpatch(
      addItem({
        item: itemCart,
      })
    );
    ditpatch(
      countTotal()
    )
  };

  const renderSizesRadio = sizes.map((size, index: number) => (
    <label
      key={index}
      className={`mx-2 cursor-pointer ${
        sizeChecked === size.label
          ? "font-extrabold underline underline-offset-4 decoration-2"
          : ""
      } ${!size.value ? "text-gray-400" : ""}`}
    >
      <input
        type="radio"
        name="picked"
        value={size.label}
        disabled={!size.value}
        className="hidden "
        onClick={() => setSizeChecked(size.label)}
      />
      {size.label}
    </label>
  ));

  return (
    <section>
      <div className="relative px-5 m-auto my-4 md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="">
            <div className="mb-5">
              <PreviewGroup>
                {imagesPaths.length &&
                  imagesPaths.map((imagePath, index) => (
                    <ImageAntd
                      key={index}
                      alt=""
                      src={`${process.env.NEXT_PUBLIC_URL_WEB}/${imagePath}`}
                      preview={{
                        maskClassName: classname("mask-custom"),
                      }}
                      rootClassName={classname("cursor")}
                    />
                  ))}
              </PreviewGroup>
            </div>
          </div>
          <div className="sticky top-0 left-0 right-0 w-full md:h-1/3 md:pt-20 md:px-10">
            <h3>{detail.name}</h3>
            <div className="flex ">
              <h5 className={`${detail.discount ? "line-through" : ""} mr-2`}>
                {FormatCurrency(detail.price)}
              </h5>
              {detail.discount !== 0 && (
                <h5>
                  {FormatCurrency(
                    Number(detail.price) -
                      (Number(detail.price) * detail.discount) / 100
                  )}
                </h5>
              )}
            </div>
            <div>
              <div className="flex ">
                <div>{renderSizesRadio}</div>
                <div
                  className="w-full flex justify-end cursor-pointer"
                  onClick={() => setVisible(true)}
                >
                  Size Guide
                </div>
              </div>
            </div>
            <div>
              <Tabs>
                <TabPane tab="Description" key="description">
                  <div
                    dangerouslySetInnerHTML={{ __html: detail.description }}
                  ></div>
                </TabPane>
                <TabPane tab="Details" key="detail">
                  <div
                    dangerouslySetInnerHTML={{ __html: detail.detail }}
                  ></div>
                </TabPane>
              </Tabs>
            </div>
            <div>
              <button className="btn" onClick={addProduct} type="submit">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        centered
        width={700}
      >
        <article className="p-2">
          <Image src={size_guide} alt="Size Guide"/>
        </article>
      </Modal>
    </section>
  );
};

export default ProductDetail;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug;
  const { data: detail } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/product/${slug}`
  );

  return {
    props: {
      detail,
    },
  };
};
