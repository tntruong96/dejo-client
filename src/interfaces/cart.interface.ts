import { IProduct } from "./product.interface";

export interface IItemCart {
    itemDetail: IItemDetail,
    count: number,
    totalPrice: number
    id: string
}

export type PickTypeProduct = Pick<IProduct, "id" | "name" | "slug" | "discount" | "price"  | "images">

export interface IItemDetail extends PickTypeProduct {
    size: number,

}