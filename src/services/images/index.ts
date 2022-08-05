import { caxios } from "@utils/axios";
import axios from "axios";

export const ImageServices = {
  deleteImages: {
    fetch: (bodyData: any) => {
      return axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/image/delete`, {
        data: bodyData,
      });
    },
  },
  uploadMultiImages: {
    fetch: (body: any) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/image/multi`,
        body,
        {
          method: "POST",
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
    },
  },
  getImages: {
    fetch: () => {
      return caxios.get(`${process.env.NEXT_PUBLIC_URL_API}/image`)
    }
  }
};
