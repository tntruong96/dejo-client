import { IProduct } from "@interfaces/product.interface";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../products-card";
import { ProductsListContainer } from "./style";

type Props = {
  products: IProduct[];
  total: number;
  fetchMore: () => void;
  hasMore: boolean;
};

const ProductsList: React.FC<Props> = ({ products, hasMore, fetchMore }) => {
  const renderProductList = products.map((product, index) => (
    <ProductCard key={index} product={product}></ProductCard>
  ));
  return (
    <InfiniteScroll
      dataLength={products.length}
      hasMore={hasMore}
      next={fetchMore}
      loader={<div>Loading</div>}
    >
      <ProductsListContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
        {renderProductList}
      </ProductsListContainer>
    </InfiniteScroll>
  );
};

export default ProductsList;
