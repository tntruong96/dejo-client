import React from "react";
import PropTypes from "prop-types";

type Props = {
    title: string,
    setImageFn: React.Dispatch<React.SetStateAction<any>>,
    [key: string] : any
}

const SelectFile: React.FC<Props> = ({ setImageFn, title }) => {
  return (
    <div className="my-5 flex flex-col w-2/3" >
      <label className="font-bold">{title}:</label>
      <input className="" type="file" name="file" id="file" onChange={(e) => setImageFn(e.target.files ? e.target.files[0] : null)}/>
    </div>
  );
};

export default SelectFile;
