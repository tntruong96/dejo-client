import FormModal from "@components/common/form-modal";
import { ProductCategories } from "@services/products";
import { createProductCategorieDTO } from "@services/products/interface";
import { Form, Input, message, notification, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IProductCategory } from "@interfaces/product.interface";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import FunctionalsButtons from "../functional-buttons";
import { ProductCategoriesDashboardContainer } from "./styles";

type dataTableType = {
  index: number;
  key: React.Key;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const columns: ColumnsType<dataTableType> = [
  {
    title: "",
    dataIndex: "index",
  },
  {
    title:"Category Name",
    dataIndex: "name"
  },
  {
    title: "Created Date",
    dataIndex: "createdAt"
  },
  {
    title: "Updated Date",
    dataIndex: "updatedAt"
  }
];

const ProductCategoriesDashboard = () => {
  const [visible, setVisible] = useState(false);
  const [srcDataTable, setSrcDataTable] = useState<dataTableType[]>([]);
  const [rowSelectedKeys, setRowSelectedKeys] = useState<React.Key[]>([])
  const router = useRouter();
  const initialFormValue = { name: "" };
  const [update, setUpdate]= useState<boolean>(false)


  const onCreate = () => {
    setVisible(true);
  };

  const onDelete = async (selectedKey: React.Key[]) => {
    try {
        const result = await ProductCategories.deleteProductCategories.fetch(selectedKey);
        notification.success({message:"Success", description: "Create Success!"});
        setVisible(false);
        setUpdate(!update);
    } catch (error) {
        notification.error({message:"Error", description:"Something Wrong"})
    }
  };

  const handleCancelModal = () => setVisible(false);

  const handleSubmit = async (formValue: any) => {
    try {
      console.log(formValue);
      const objDTO: createProductCategorieDTO = { ...formValue };
      const result = await ProductCategories.createProductCategories.fetch(
        objDTO
      );
      notification.success({message:"Success", description: "Create Success!"})
      setVisible(false);
      setUpdate(!update);
    } catch (error) {
      notification.error({ message: "Error", description: "Something Wrong!" });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setRowSelectedKeys(newSelectedRowKeys);
  };


  const rowSelection = {
    rowSelectedKeys,
    onChange: onSelectChange
  }

  const handleDataTable = async () => {
    const {data} = await ProductCategories.getProductCategories.fetch();
    const transformedData = !data.length ? [] : data.map( (item: IProductCategory ,index: number) => {
        const dataRow: dataTableType = {
            index,
            name: item.name,
            key: item.id,
            updatedAt: moment(item.updatedAt).format('dddd, DD/MM/YYYY'),
            createdAt: moment(item.createdAt).format('dddd, DD/MM/YYYY')
        }
        return dataRow;
    });
    setSrcDataTable(transformedData);
  }

  useLayoutEffect(() => {
    handleDataTable(); 
  }, [update])

  return (
    <ProductCategoriesDashboardContainer>
      <FunctionalsButtons
        onCreate={onCreate}
        onDelete={() => onDelete(rowSelectedKeys)}
        disabledDelete={!rowSelectedKeys.length}
      />
      <FormModal
        initialValueForm={initialFormValue}
        onCancel={handleCancelModal}
        onCreate={handleSubmit}
        title={"Add New Blog Category"}
        visible={visible}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </FormModal>
      <Table rowSelection={rowSelection} className="py-4" columns={columns} dataSource={srcDataTable}  scroll={{x: 570}}/>
    </ProductCategoriesDashboardContainer>
  );
};

export default ProductCategoriesDashboard;
