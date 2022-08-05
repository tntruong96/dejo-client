import { Dropdown } from 'antd';
import React from 'react';

interface Props {
    overlay: React.ReactElement ;
    trigger?: Array<'click'|'hover'>
}

const DropdownComponent: React.FC<Props> = ({overlay, trigger, children}) => {

    // const cloneChildren = React.Children.map(children, (child) => {
    //     if(React.isValidElement(child)){
    //         return React.cloneElement(child);
    //     }
    // })

    return (
       <Dropdown trigger={trigger} overlay={overlay}>
        {
            children
        }
       </Dropdown>
    );
};

export default DropdownComponent;