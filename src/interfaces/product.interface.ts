export interface IProduct {
    name: string,
    id: string,
    slug: string,
    price: number | string,
    description: string,
    status: boolean,
    sizes: string,
    colors: string,
    thumbnail: string,
    images: string,
    createdAt: string,
    updatedAt: string,
    category: IProductCategory,
    detail: string,
    discount: number;
}

export type PickProductType = Pick<IProduct, "name" | "price" | "description" | "images" | "sizes" | "colors" | "thumbnail" | "detail" | "discount" >

export interface CreateProductDTO extends PickProductType {
    categoryId: string
}

export interface IProductCategory {
    id: string,
    name: string,
    slug: string,
    status: number,
    createdAt: string,
    updatedAt: string
}