import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Blogs } from "@services/blogs";
import { Image, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import { IBlog } from "@interfaces/blog.interface";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FunctionalsButtons from "../functional-buttons";
import { BlogDashboardContainer } from "./styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type typeDataTable = {
  key: React.Key;
  index: number;
  title: React.ReactElement;
  thumb: React.ReactElement;
  updatedAt: string;
  createdAt: string;
  slug: string
};

const column: ColumnsType<typeDataTable> = [
  {
    title: "id",
    dataIndex: "index",
    width: "50px",
  },
  {
    title: "",
    render(value, record, index) {
        // console.log(va);
      return (
        <Link passHref href={`/admin/update-blog?slug=${value.slug}`}>
          <a>
            <FontAwesomeIcon icon={faEdit as IconProp} />
          </a>
        </Link>
      );
    },
  },
  {
    title: "",
    dataIndex: "thumb",
    width: "250px",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const BlogsDashboard = () => {
  const route = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sourceDataTable, setSourceDataTable] = useState();
  const [update, setUpdate]= useState<boolean>(false)


  const onCreate = (): void => {
    route.push("/admin/create-blog");
  };
  const onDelete = async () => {
    try {
      const result = await Blogs.deleteMulti.fetch(selectedRowKeys);
      setUpdate(!update);
    } catch (error) {}
  };

  const rowSelection: TableRowSelection<typeDataTable> = {
    onChange(selectedRowKeys, selectedRows, info) {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  const handleDataTable = async () => {
    const { data } = await Blogs.getBlogs.fetch();
    const transformedData =
      data && data.items.length
        ? data.items.map((item: IBlog, index: number) => {
            const objData: typeDataTable = {
              key: item.id,
              index,
              slug: item.slug,
              createdAt: moment(item.createdAt).format("dddd, DD/MM/YYYY"),
              updatedAt: moment(item.updatedAt).format("dddd, DD/MM/YYYY"),
              thumb: <Image src={item.thumbnailPath} width={200} height={200} alt={item.slug}/>,
              title: (
                <Link passHref href={`/blog-detail/${item.slug}`}>
                  <a className="hover:underline ">{item.title}</a>
                </Link>
              ),
            };
            return objData;
          })
        : [];
    setSourceDataTable(transformedData);
  };

  useEffect(() => {
    handleDataTable();
  }, [update]);

  return (
    <BlogDashboardContainer>
      <FunctionalsButtons
        onCreate={onCreate}
        onDelete={onDelete}
        disabledDelete={!selectedRowKeys.length}
      />
      <Table
        rowSelection={rowSelection}
        columns={column}
        dataSource={sourceDataTable}
        scroll={{ x: 500 }}
        className="py-4"
      />
    </BlogDashboardContainer>
  );
};

export default BlogsDashboard;
