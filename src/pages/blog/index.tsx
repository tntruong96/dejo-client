import React from "react";
import CardBlog from "@components/blogs/card-blog";
import { IBlog } from "interfaces/blog.interface";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useUserProfile } from "@utils/hooks/useUserProfile";
import { ROLE } from "interfaces/authenticate.interface";
import { PaginateItem } from "interfaces/paginate.interface";
import { Empty, Pagination } from "antd";
import style from "../../styles/modules/Blog.module.scss";
import { useModuleClassNames } from "@utils/hooks/useStyle";
import {m} from 'framer-motion'

interface Props {
  blogs: PaginateItem<IBlog>;
  current: string;
  [key: string]: any;
}

const Blog: React.FC<Props> = ({ blogs, current }) => {
  const router = useRouter();
  const profile = useUserProfile();
  const classname = useModuleClassNames(style);

  const renderListBlog = blogs.items.map((blog) => (
      <CardBlog key={blog.id} blog={blog}></CardBlog>

  ));

  const handleOnChangePage = async (page: number, pageSize: number) => {
    router.push({
      pathname:'/blog',
      query: { page: `${page}` }
    })
  };

  return !blogs.items.length ? (
    <div className="min-h-screen">
      {profile && profile.role === ROLE.ADMIN ? (
        <div className="ml-auto mr-10 w-32">
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
      <div className={classname("empty-container")}>
        <Empty />
      </div>
    </div>
  ) : (
      <m.div  exit={{opacity: 0}} initial={{opacity:0}} animate={{opacity: 1}} className="flex flex-col items-center min-h-screen">
        {profile && profile.role === ROLE.ADMIN ? (
          <div className="self-end mr-10">
            <m.button
              whileHover={{scale:1.1}}
              className="btn"
              type="button"
              onClick={() => router.push("/blog/create-blog")}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="ml-2">New Blog</span>
            </m.button>
          </div>
        ) : null}
        <m.div  className="flex flex-col w-full justify-center items-center">
        {renderListBlog}
        <div className="w-full mt-auto flex justify-center">
          <Pagination
            defaultCurrent={1}
            current={Number(current)}
            defaultPageSize={2}
            total={blogs.total}
            onChange={handleOnChangePage}
          />
        </div>
        </m.div>
       
      </m.div>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {query} = ctx;
  const { data: blogs } = await axios.get(
    `${process.env.URL_API}/blog?limit=2&page=${query.page}`
  );
  return {
    props: {
      blogs: blogs || [],
      current: query.page
    },
  };
};

export default Blog;
