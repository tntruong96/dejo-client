import SpinFC from 'antd/lib/spin';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const Spin = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <SpinFC className='absolute bottom-0' indicator={antIcon} />
    );
};

export default Spin;