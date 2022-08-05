import { caxios } from "@utils/axios"
import { CreateProductDTO } from "@interfaces/product.interface"
import React from "react"
import { createProductCategorieDTO } from "./interface"

export const ProductCategories = {
    createProductCategories: {
        fetch: (createDTO: createProductCategorieDTO) => {
            return caxios.post(`${process.env.NEXT_PUBLIC_URL_API}/product-categories/new`, createDTO)
        }
    },
    deleteProductCategories: {
        fetch: (ids: React.Key[]) => {
            return caxios.delete(`${process.env.NEXT_PUBLIC_URL_API}/product-categories/delete-all`, {data: ids})
        }
    },
    getProductCategories: {
        fetch: ()=> {
            return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/product-categories`);
        }
    }
}


export const Products = {
    createProduct: {
        fetch: (newProduct: CreateProductDTO ) => {
            return caxios.post(`${process.env.NEXT_PUBLIC_URL_API}/product/new`, newProduct);
        }
    },
    getProducts: {
        fetch: (linmit:number = 10, page: number = 1) => {
            return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/product?limit=${linmit}&page=${page}`);
        }
    },
    deleteProduct: {
        fetch: (ids: React.Key[]) => {
            return caxios.delete(`${process.env.NEXT_PUBLIC_URL_API}/product/delete-multi`, {data: ids});
        }
    }
}