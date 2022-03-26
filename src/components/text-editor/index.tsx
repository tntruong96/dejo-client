import axios from "axios";
import { quillConfig } from "configs/react-quil-config";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import { QuillContainer } from "./styles";
const ReactQuill = dynamic<any>(async () => {
    const {default: RQ} = await import('react-quill')
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
}, { ssr: false });

// const QuillWithRef = React.forwardRef((props, ref) => {
//   return <ReactQuill ref={(el) => } {...props} />;
// });

type QuillProps = {
  className?: string;
  style?: React.DetailedHTMLProps<
    React.StyleHTMLAttributes<HTMLStyleElement>,
    HTMLStyleElement
  >;
  value?: string;
  onChange?: (content: string) => void;
  [key: string]: any;
};

const QuillEditor = ({
  className,
  style,
  value,
  onChange,
  ...props
}: QuillProps) => {
  const quillRef = useRef<any>();
  //   console.log("ref", ref.current);
  //   console.log(QuillWithRef);

  const onChangeData = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    onChange && onChange(editor.getText().trim().length === 0 ? '' : content) ;
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
            `${process.env.URL_API}/upload-image`,
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
    value: value || "",
    modules: quillConfig.modules,
    formats: quillConfig.formats,
    theme: "snow",
    ...props,
    onChange: onChangeData,
  };

  return (
    <QuillContainer className={className} style={style}>
      <ReactQuill forwardedRef={quillRef} {...quillProps} />
    </QuillContainer>
  );
};

export default QuillEditor;
