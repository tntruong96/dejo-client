import React from "react";
import PropTypes from "prop-types";
import { useField, useFormikContext } from "formik";

type Props = {
    name: string,
    label: string,
    // setImageFn: React.Dispatch<React.SetStateAction<any>>,
    [key: string] : any
}

const SelectFile: React.FC<Props> = (props) => {
  const { setFieldValue, values } = useFormikContext()
  const [field, meta, helpers] = useField(props);
  const {label} = props;
  const {value, ...rest} = field;
  const {setValue} = helpers;

  const handleOnChange = (files: FileList | null) => {
    const arrFile = files?.length && [files[0]]
    setFieldValue(field.name, arrFile)
    console.log(values)
  }

  return (
    <div className="my-5 flex flex-col w-2/3" >
      <label className="font-bold mb-2">{label}:</label>
      <input className="" type="file"  {...rest}  onChange={(e) => handleOnChange(e.target.files)}/>
      {meta.error && meta.touched && (<div className={"error mt-2"}>{meta.error}</div>)}
    </div>
  );
};

export default SelectFile;
