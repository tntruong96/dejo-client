import React from "react";
import PropTypes from "prop-types";
import { CardContainer } from "./styles";
import { convertDate } from "@utils/date";
import Image from "next/image";
import { useRouter } from "next/router";
import { IBlog } from "@interfaces/blog.interface";
import DOMPurify from "dompurify";
import ImageError from "@components/common/image-error";
import { Divider } from "antd";

interface Props {
  blog: IBlog;
  index: number;
  total: number;
  [key: string]: any;
}

const CardBlog: React.FC<Props> = ({ blog, index, total }) => {
  const router = useRouter();
  const cleanHtml = DOMPurify.sanitize(blog.content);
  return (
    <CardContainer
      onClick={() => router.push(`/blog-detail/${blog.slug}`)}
      className="flex flex-col items-center justify-center w-full md:w-2/3 p-4"
    >
      <div className="flex flex-col sm:grid sm:grid-cols-2 ">
        <div className="col-start-1 mb-4 sm:p-4">
          <p className="mb-0 text-xl font-bold">{blog.title}</p>
          <p>{convertDate(blog.createdAt)}</p>

          {/* <div className='mt-5' dangerouslySetInnerHTML={{__html: `${cleanHtml}`}}></div> */}
          <p>{blog.shortContent}</p>
          <button className="font-semibold">Read More</button>
        </div>
        <div className="col-start-2 relative w-full h-[50vw] sm:h-[250px] md:h-[300px] p-4">
          {blog && blog.thumbnailPath ? (
            <Image
              unoptimized={true}
              //   width={300}
              //   height={300}
              layout="fill"
              objectFit="cover"
              src={`${process.env.NEXT_PUBLIC_URL_WEB}/${blog.thumbnailPath}`}
              alt=""
            />
          ) : (
            <ImageError />
          )}
        </div>
      </div>

      {index === total - 1 ? null : <Divider />}
    </CardContainer>
  );
};

export default CardBlog;
