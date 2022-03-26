

import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navbar/navbar';

interface Props {
    children: ReactElement
}

const Layout: React.FC<Props>= ({children}) => {
    return (
        <>
            <Navbar/>
            <main>{children}</main>
        </>
    );
}

export default Layout;