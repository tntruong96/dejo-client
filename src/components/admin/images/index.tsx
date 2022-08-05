import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImagesContainer } from "./styles";
import { IImage } from "../../../interfaces/image.interface";
import {
  Modal,
  Table,
  Form,
  Upload,
  UploadProps,
  message,
  notification,
  Popconfirm,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { Image } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import SelectFile from "@components/blogs/select-file";
import FormModal from "@components/common/form-modal";
import { InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import { ImageServices } from "@services/images";
import { useRouter } from "next/router";
import { UploadFile } from "antd/lib/upload/interface";
import moment from "moment";
import FunctionalsButtons from "../functional-buttons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface DataTypeTable {
  key: React.Key;
  id: number;
  preview: any;
  createdAt: string;
  name: string;
  type: string;
}

interface PropValueFromEvent {
  file: UploadFile;
  fileList: UploadFile[];
}

// interface IForm {
//   image: [];
// }

const columns: ColumnsType<DataTypeTable> = [
  {
    title: "Id",
    dataIndex: "id",
    fixed: "left",
    width: 50,
  },
  {
    title: "",
    render: () => (
      <Link passHref href={"/"} shallow>
        <a>
          <FontAwesomeIcon icon={faEdit as IconProp} />
        </a>
      </Link>
    ),
    width: 100,
    key: "operation",
  },
  {
    title: "Preview",
    dataIndex: "preview",
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
  },

  {
    title: "Created At",
    dataIndex: "createdAt",
  },
];

const Images = () => {
  const router = useRouter();
  const initialDataForm = { files: [] };
  const [listFileImages, setListFileImages] = useState<UploadFile[]>([]);
  const data: DataTypeTable[] = [];
  const [dataTable, setDataTable] = useState<DataTypeTable[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [visible, setVisible] = useState(false);
  const [validate, setValidate] = useState(false);
  const [update, setUpdate] = useState<boolean>(false);

  const arrImages: RcFile[] = [];

  /* Fetch Images from BE */
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_URL_API}/image`).then((res) => {
      handleDataTable(res.data[0]);
      setDataTable(data);
    });
  }, [update]);

  /* handle Modal */

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const uploadProps: UploadProps = {
    name: "files",
    multiple: false,
    listType: "picture",
    beforeUpload: (file, fileList) => {
      const isPNGOrJPG =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isPNGOrJPG) {
        message.error("Please chose images have type PNG or JPEG");
      }
      const sizeSmall = file.size / 1024 / 1024 < 2;
      if (!sizeSmall) {
        message.error("Please choose file have size smaller than 2MB!");
      }
      //   return isPNGOrJPG && sizeSmall ? false : true;
      return true;
    },
    onChange(info) {
      let hasError = 0;
      console.log(info);
      info.fileList.forEach((item) => {
        if (item.error) hasError += 1;
      });
      if (hasError !== 0) {
        setValidate(true);
      } else {
        setValidate(false);
      }
    },
  };

  const normFile = (e: PropValueFromEvent) => {
    setListFileImages([...e.fileList]);
  };

  const handleSubmit = async (formValue: any) => {
    try {
      const body = new FormData();
      for (let f of listFileImages as UploadFile[]) {
        body.append("file", f.originFileObj as Blob);
      }
      const data = await ImageServices.uploadMultiImages.fetch(body);

      if (data) {
        notification.success({
          message: "Upload Success!",
          description: "Sucess",
        });
        updateUI();
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Have Something Wrong!",
      });
    }
  };

  function updateUI() {
    setVisible(false);
    setUpdate(!update);
  }

  /* ******************** */

  const onDelete = async () => {
    try {
      const result = await ImageServices.deleteImages.fetch({
        ids: selectedRowKeys,
      });
      notification.success({
        message: "Delete Success!",
      });
      updateUI();
      return result;
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Have Something Wrong!",
      });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDataTable = (images: IImage[]) => {
    images.map((image, index) => {
      const dataObj: DataTypeTable = {
        createdAt: moment(image.createdAt).format("dddd, DD/MM/YYYY"),
        id: index,
        key: image.id,
        preview: (
          <Image
            className="root"
            width={100}
            height={100}
            src={`${process.env.NEXT_PUBLIC_WEB_API}/${image.path}`}
            alt={image.name}
            preview={{
              onVisibleChange(value, prevValue) {
                console.log(value);
                console.log(prevValue);
              },
            }}
          />
        ),
        name: image.name,
        type: image.type,
      };

      data.push(dataObj);
    });
  };

  return (
    <ImagesContainer>
      {/* <div className="flex justify-end mr-5">
        <div className="mr-2">
          <Popconfirm title="Are you Sure?" onConfirm={onDelete} disabled={!selectedRowKeys.length}>
            <button className="btn" >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </Popconfirm>
        </div>
        <div>
          <button
            className="btn flex justify-center items-center"
            onClick={showModal}
          >
            <FontAwesomeIcon icon={faUpload} />
            &nbsp; Upload
          </button>
        </div>
      </div> */}
      <FunctionalsButtons
        onCreate={showModal}
        onDelete={onDelete}
        disabledDelete={!selectedRowKeys.length}
      />
      <FormModal
        title="Upload Image"
        visible={visible}
        onCancel={handleCancel}
        onCreate={handleSubmit}
        initialValueForm={initialDataForm}
      >
        <Form.Item name="files" label="Dragger">
          <Form.Item
            name="files"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: validate, message: "" }]}
          >
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </FormModal>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataTable}
        scroll={{ x: 500 }}
        className={"py-4"}
      />
    </ImagesContainer>
  );
};

export default Images;
