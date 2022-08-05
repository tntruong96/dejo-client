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
    thumbnailPath: string;
    slug: string;
    thumbnail: string;
    shortContent: string
}

export type IBlogFormValue = {
    title: string,
    content: string,
    categoryId: string,
    // titleImage: File[]
    thumbnail: string,
    shortContent: string
}


export type IBlogCreateDTO = {
    title: string,
    content: string,
    thumbnail: string,
    category: string,
    createdBy: number,
    shortContent: string
}

export interface IBlogCategories  {
    id: string,
    name: string,
    [key: string]: any
}