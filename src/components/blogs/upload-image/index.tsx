import React, { ReactChild, useState } from "react";
import PropTypes from "prop-types";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadContainer } from "./style";
import { UploadChangeParam, RcFile } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import classNames from "classnames";
import Image from 'next/image'


interface Props {
    label: string,
    onChange: (content: any) => void
}

const UploadImage: React.FC<Props> = ({onChange, label, ...props}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadBtn = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function getBase64(img: RcFile | undefined, callback: (data: any) => void) {
    if(img){
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
  }

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => setImageUrl(imageUrl))
        onChange && onChange(info.file);
        setLoading(false);
    }
  };

  return (
    <UploadContainer>
     <label className="font-bold" htmlFor="image-title">{label}: </label>
      <Upload
        name="avatar"
        listType="picture-card"
        className={classNames("avatar-uploader", 'my-2')}
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="avatar" width="100%"/>
        ) : (
          uploadBtn
        )}
      </Upload>
    </UploadContainer>
  );
};

export default UploadImage;
