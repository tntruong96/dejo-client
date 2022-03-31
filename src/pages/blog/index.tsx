import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Blogs } from "../../services/blogs";
import CardBlog from "@components/blogs/card-blog";
import { IBlog } from "interfaces/blog.interface";
import { useRouter } from "next/router";
import axios from "axios";

interface Props {
  blogs: PaginateItem<IBlog>;
  [key: string]: any;
}

const Blog: React.FC<Props> = ({ blogs }) => {
  const router = useRouter();
  const profile = useUserProfile();
  const [blogData, setBlogData] = useState(blogs.items);

  const renderListBlog = blogData.map((blog) => (
    <CardBlog key={blog.id} blog={blog}></CardBlog>
  ));

  const handleOnChangePage= async (page:number, pageSize: number) => {
    const pageData = await axios.get(`${process.env.URL_API}/blog?limit=${pageSize}&page=${page}`);
    setBlogData(pageData.data.items);
  }

  return (
    <>
    <div className="flex flex-col justify-center items-center">
      {profile && profile.role === ROLE.ADMIN ? (
        <div className="self-end mr-10">
          <button
            className="btn"
            type="button"
            onClick={() => router.push("/blog/create-blog")}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2">New Blog</span>
          </button>
        </div>
      ) : null}
      {renderListBlog}
        <Pagination defaultPageSize={2} total={blogs.total} onChange={handleOnChangePage}/>
    </div>

    </>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { ROLE } from "interfaces/authenticate.interface";
import { PaginateItem } from "interfaces/paginate.interface";
import { Pagination } from "antd";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: blogs } = await axios.get(`${process.env.URL_API}/blog?limit=2`);

  return {
    props: {
      blogs,
    },
  };
};

export default Blog;
