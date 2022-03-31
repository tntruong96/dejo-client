

export interface IBlog {
    id: number,
    title: string,
    content: string,
    status: number,
    images: string,
    categoryId: string,
    createdBy: number,
    createdAt: string,
    updatedAt: string
    thumb: string;
    slug: string;
}

export type IBlogFormValue = {
    title: string,
    content: string,
    categoryId: string
}


export type IBlogCreateDTO = Omit<IBlog, "id" | "status" | "createdAt" | "updatedAt" | "slug" | "thumb">

export interface IBlogCategories  {
    id: number,
    name: string,
    [key: string]: any
}