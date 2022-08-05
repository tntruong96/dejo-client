import { caxios } from "../../utils/axios";
import { IBlogCreateDTO } from "../../interfaces/blog.interface";
import { CreateBlogCategoryDTO, createBlogDTO } from "./blogs.interface";
import React from "react";

export const Blogs = {
  getBlogs: {
    fetch: async (limit: number = 10, page: number=1) => {
      return caxios.get(`/api/blog?limit=${limit}&page=${page}`);
    },
  },
  getBlogContent: {
    fetch: async (slug: string) => {
      return caxios.get(`/api/blog/${slug}`);
    },
  },
  createBlog: {
    fetch: async (dataCreate: IBlogCreateDTO) => {
      return caxios.post(`/api/blog/create-new`, dataCreate);
    },
  },
  deleteMulti: {
    fetch: async (ids: React.Key[]) => {
      return caxios.delete(`${process.env.NEXT_PUBLIC_URL_API}/blog/delete-multi`, {data: ids})
    }
  },
  updateBlog: {
    fetch: async(id: React.Key, dto: IBlogCreateDTO) => {
      return caxios.put(`${process.env.NEXT_PUBLIC_URL_API}/blog/update/${id}`, dto)
    }
  }
};

export const BlogCategories = {
  create: {
    fetch: async (createDTO: CreateBlogCategoryDTO) => {
      return caxios.post("/api/blog-categories/create-new", { ...createDTO });
    },
  },
  getList: {
    fetch: async () => {
      return caxios.get("/api/blog-categories/", { withCredentials: true });
    },
  },

  deleteAll: {
    fetch: async (ids: React.Key[]) => {
      return caxios.delete("/api/blog-categories/delete-all", { data: ids });
    },
  },
};
