import React from "react";
import CardBlog from "@components/blogs/card-blog";
import { IBlog } from "@interfaces/blog.interface";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps } from "next";
import { PaginateItem } from "@interfaces/paginate.interface";
import { Empty } from "antd";
import style from "../../styles/modules/Blog.module.scss";
import { useModuleClassNames } from "@utils/hooks/useStyle";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spin from "@components/common/spin";
import { Blogs } from "@services/blogs";
import { useEffect } from "react";

interface Props {
  blogs: PaginateItem<IBlog>;
  current: string;
  [key: string]: any;
}

const Blog: React.FC<Props> = ({ blogs, current }) => {
  const router = useRouter();
  const classname = useModuleClassNames(style);
  const [blogItems, setBlogItems] = useState(blogs.items);
  const [total, setTotal] = useState(blogs.total);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    blogItems.length < total ? setHasMore(true) : setHasMore(false);
    console.log(total)
  }, [blogItems])

  const renderListBlog = blogItems.map((blog, index) => (
    <CardBlog index={index} total={total} key={blog.id} blog={blog}></CardBlog>
  ));

  const fetchMoreBlog = async () => {
      try {
        const {data} = await Blogs.getBlogs.fetch(2,page + 1);
        setPage(prev => prev+1)
        setBlogItems([...blogItems,...data.items])
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

  // const handleOnChangePage = async (page: number, pageSize: number) => {
  //   router.push({
  //     pathname: "/blog",
  //     query: { page: `${page}` },
  //   });
  // };

  return !blogItems.length ? (
    <div className="min-h-screen">
      <div className={classname("empty-container")}>
        <Empty />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center min-h-screen">
        <InfiniteScroll  className="flex flex-col w-full justify-center items-center" dataLength={blogItems.length} next={fetchMoreBlog} hasMore={hasMore} loader={(<Spin/>)}>{renderListBlog}</InfiniteScroll>
        {/* <div className="w-full mt-auto flex justify-center">
          <Pagination
            defaultCurrent={1}
            current={Number(current)}
            // defaultPageSize={1}
            total={blogs.total}
            onChange={handleOnChangePage}
          />
        </div> */}
    </div>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { data: blogs } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL_API}/blog?limit=2&page=1`
    // `${process.env.NEXT_PUBLIC_URL_API}/blog`
  );

  // const {data: totalNumberItems} = await
  return {
    props: {
      blogs: blogs || [],
      current: query.page || 1,
    },
  };
};

export default Blog;
