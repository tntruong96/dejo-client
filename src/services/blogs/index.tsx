import { caxios } from "../../utils/axios"
import { IBlogCreateDTO} from '../../interfaces/blog.interface'


export const Blogs = {
    getList: {
        fetch : async () => {
            return caxios.get("/api/blog");
        }
    },
    getBlogContent: {
        fetch: async (slug: string) => {
            return caxios.get(`/api/blog/${slug}`);
        }
    },
    createBlog: {
        fetch: async (dataCreate: IBlogCreateDTO) => {
            return caxios.post(`/api/blog/create-new`, dataCreate);
        }
    }
}