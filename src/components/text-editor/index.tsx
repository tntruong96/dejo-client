import axios from "axios";
import { quillConfig } from "configs/react-quil-config";
import { useField, useFormikContext } from "formik";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import { QuillContainer } from "./styles";
const ReactQuill = dynamic<any>(async () => {
    const {default: ReactQuill} = await import('react-quill')
    //@ts-ignore
    return ({ forwardedRef, ...props }) => <ReactQuill ref={forwardedRef} {...props} />;
}, { ssr: false });

// const QuillWithRef = React.forwardRef((props, ref) => {
//   return <ReactQuill ref={(el) => } {...props} />;
// });

type QuillProps = {
  name: string,
  className?: string;
  // style?: React.DetailedHTMLProps<
  //   React.StyleHTMLAttributes<HTMLStyleElement>,
  //   HTMLStyleElement
  // >;
  // value?: string;
  // onChange?: (content: string) => void;
  [key: string]: any;
};

const QuillEditor: React.FC<QuillProps> = (props) => {
  const {setFieldValue} = useFormikContext();
  const quillRef = useRef<any>();
  const [field, meta, helpers] = useField(props);
  const {className} = props

  // helpers.setTouched(true)

  const onChangeData = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
      setFieldValue(field.name ,editor.getText().trim().length === 0 ? '' : content) ;
  };

  const _addImageHandler = () => {
    const editor = quillRef.current.getEditor();
    editor.getModule("toolbar").addHandler("image", () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file: File | null = input.files ? input.files[0] : null;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_URL_API}/upload-image`,
            formData,
            {
              method: "POST",
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
          const range: any | null = editor.getSelection(true)
          editor.insertEmbed(range.index, 'image', data.path)
        }
      };
    });
  };

  useEffect(() => {
    if (quillRef.current) {
      _addImageHandler();

    }
  });

  const quillProps = {
    // ref: quillRef,
    value: field.value || "",
    modules: quillConfig.modules,
    formats: quillConfig.formats,
    theme: "snow",
    ...props,
    onChange: onChangeData,
  };

  return (
    <QuillContainer className={className}>
      <ReactQuill forwardedRef={quillRef} {...quillProps}/>
      {meta.error && (<div className="error">{meta.error}</div>)}
    </QuillContainer>
  );
};

export default QuillEditor;
