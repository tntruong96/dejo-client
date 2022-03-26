import axios from "axios";
import { caxios } from "../../utils/axios";
import { CreateBlogCategoryDTO } from "./blog-categories.interface";

export const BlogCategories = {
  create: {
    fetch: async (createDTO: CreateBlogCategoryDTO) => {
      return caxios.post("/api/blog-categories/create-new", { ...createDTO });
    },
  },
  getList: {
      fetch: async () => {
        return caxios.get("/api/blog-categories/", {withCredentials: true});
      }
  }
};
