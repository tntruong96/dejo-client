import { UserProfile } from "./authenticate.interface";


export interface IBlog {
    id: number,
    title: string,
    content: string,
    status: number,
    images: string,
    category: IBlogCategories,
    createdBy: UserProfile,
    createdAt: string,
    updatedAt: string
    thumb: string;
    slug: string;
}

export type IBlogFormValue = {
    title: string,
    content: string,
    categoryId: string,
    titleImage: File[]
}


export type IBlogCreateDTO = {
    title: string,
    content: string,
    images: string,
    category: number,
    createdBy: number,
}

export interface IBlogCategories  {
    id: number,
    name: string,
    [key: string]: any
}