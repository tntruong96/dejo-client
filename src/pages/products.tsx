import { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'
import axios from 'axios';
import ProductsFilter from '@components/products/products-filter';
import ProductsList from '@components/products/products-list';
import { IProduct, IProductCategory } from '@interfaces/product.interface';
import {ProductCategories, Products as productService} from '@services/products/index';
import { Empty } from 'antd';

type TypeProduct ={
    items: IProduct[],
    total: number,
}

type Props = {
    products: TypeProduct;
    categories: IProductCategory[]
}

const Products: NextPage<Props> = ({products: {items, total}, categories}) => {
    const [listUnitProduct, setListUnitProduct] = useState<IProduct[]>(items);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState(2);

    useEffect(() => {
        setHasMore(listUnitProduct.length < total ? true : false);
    }, [listUnitProduct])


    const fetchMoreProduct = async () => {
        try {
            const {data: {items, total}} = await productService.getProducts.fetch(10,page);
            setListUnitProduct([...listUnitProduct, ...items]);
            setPage(prev => prev+1)

        } catch (error) {
            console.log(error)
        }
    }

    // const callbackFetchMoreProduct =useCallback(() => {
    //     async () => {
    //         try {
    //             const {data: {items, total}} = await productService.getProducts.fetch(2,page);
    //             setListUnitProduct([...listUnitProduct, ...items]);
    //             setPage(prev => prev+1)
    
    //         } catch (error) {
    //             console.log(error)
    //         }}
    // }, [listUnitProduct])
    
    return listUnitProduct.length ? (
        <section className='p-2'>
            <ProductsFilter categories={categories}/>
            <ProductsList hasMore={hasMore} fetchMore={fetchMoreProduct} products={listUnitProduct} total={total}/>
        </section>
    ) : (
        <div className='h-screen flex justify-center items-center'>
            <Empty/>
        </div>
    );
};

export default Products;



export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data: products } = await productService.getProducts.fetch();
    const {data: categories} = await ProductCategories.getProductCategories.fetch();
    return {
        props: {
            products,
            categories
        }
    }
}