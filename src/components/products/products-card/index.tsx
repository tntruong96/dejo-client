import { FormatCurrency } from "@utils/formatCurrency";
import { IProduct } from "@interfaces/product.interface";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ProductCardContainer } from "./style";
import CarouselProductImage from "./carousel-product-image";
import useWindowDimensions from "@utils/hooks/useWindowDimentions";

type Props = {
  product: IProduct;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const route = useRouter();
  const imagePath = JSON.parse(product.images);
  const {width, height} = useWindowDimensions();

  // useEffect(
  //   () => {
  //     console.log(width)
  //   }, [width]
  // )

  const handleRouting = (slug: string) => {
    route.push(`/product-detail/${slug}`);
  };
  return (
    <ProductCardContainer className="p-5 w-full sm:w-[500px]  md:w-[400px]">
      <div
        className="relative h-[600px]  sm:h-[700px] md:h-[500px] w-full"
        // onClick={() => {handleRouting(product.slug)}}
      >
        <CarouselProductImage  slug={product.slug} imagesPaths={imagePath} />
      </div>
      <div>
        <h4
          className="cursor-pointer"
          onClick={() => {
            handleRouting(product.slug);
          }}
        >
          {product.name}
        </h4>
        <div className="flex ">
          <h5 className={`${product.discount ? "line-through" : ""} mr-2`}>
            {FormatCurrency(product.price)}
          </h5>
          {product.discount !== 0 && (
            <h5>
              {FormatCurrency(
                Number(product.price) -
                  (Number(product.price) * product.discount) / 100
              )}
            </h5>
          )}
        </div>
      </div>
    </ProductCardContainer>
  );
};

export default ProductCard;
