import { Checkbox, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useField } from "formik";
import React, { useEffect, useState } from "react";

export interface ICheckbox {
  label: string;
  value: string;
}

type Props = {
  items: ICheckbox[];
  classNames?: string;
  name: string;
  showCheckAll?: boolean;
};

const CheckboxComponent: React.FC<Props> = ({
  items,
  classNames,
  name,
  showCheckAll = false,
}) => {
  const [field, meta, helper] = useField(name);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([])

  const allValue = items.reduce<string[]>((prev, cur) => {
    prev.push(cur.value);
    return prev;
  }, [])

useEffect(() => {
    if(!checkedList.length){
        helper.setError('true'),
        helper.setTouched(true)
    } else {
        helper.setError('false'),
        helper.setTouched(false)
    }
}, [checkedList])

  const handleOnchange = (checkedValues: CheckboxValueType[]) => {
    helper.setValue(checkedValues);
    setCheckedList(checkedValues)
    setIndeterminate(!!checkedValues.length && checkedValues.length < items.length);
    setCheckAll(checkedValues.length === items.length);
  };

  const handleCheckAll = (e: CheckboxChangeEvent) => {
    console.log(e)
    helper.setValue(e.target.checked ? allValue : []);
    setCheckedList(e.target.checked ? allValue : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  }



  return (
    <div>
      {showCheckAll && <Checkbox indeterminate={indeterminate} onChange={handleCheckAll} checked={checkAll}>Check All</Checkbox>}
      <Checkbox.Group
        className={classNames}
        options={items}
        onChange={handleOnchange}
        value={checkedList}
      ></Checkbox.Group>
    </div>
  );
};

export default CheckboxComponent;
