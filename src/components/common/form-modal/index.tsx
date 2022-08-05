import { Form, Modal, ModalProps } from "antd";
import React, { useState } from "react";

interface PropFormModal {
  visible: boolean;
  title: string,
  onCreate: (values: any) => void;
  onCancel: () => void;
  initialValueForm: {};
  [key: string]: any
}

const FormModal: React.FC<PropFormModal> = ({
  visible,
  onCancel,
  onCreate,
  title,
  initialValueForm,
  children,
}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cloneChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
  });

  const handleOke = async () => {
    try {
      console.log(form)
        const value = await form.validateFields();
        setConfirmLoading(true);
      await onCreate(value);
      form.resetFields();
      setConfirmLoading(false);
    } catch (error) {
      setConfirmLoading(false);
      throw error;

    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOke}
    >
      <Form form={form} layout={"vertical"} initialValues={initialValueForm} name="form-modal">
        {cloneChildren}
      </Form>
    </Modal>
  );
};

export default FormModal;
