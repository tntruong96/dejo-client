import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popconfirm } from "antd";
import React from "react";

interface Props {
  onCreate: () => void;
  onDelete: () => void;
  disabledDelete: boolean;
  [key: string]: any;
}

const FunctionalsButtons: React.FC<Props> = ({
  onCreate,
  onDelete,
  disabledDelete,
  children
}) => {
  return (
    <div className="flex justify-end mr-5">
        {
            children
        }
      <div className="mx-2 w-16">
        <Popconfirm
          title="Are you Sure?"
          onConfirm={onDelete}
          disabled={disabledDelete}
        >
          <button className="btn">
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </Popconfirm>
      </div>
      <div className="w-16">
        <button
          className="btn"
          onClick={onCreate}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default FunctionalsButtons;
