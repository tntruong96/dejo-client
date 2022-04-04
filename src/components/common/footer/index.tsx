

import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FooterContainer } from './style';

const Footer = () => {
    return (
       <FooterContainer className='flex justify-center w-full'>
           <span>Copyright <FontAwesomeIcon icon={faCopyright}/> 2022 De Jo Sai Gon</span>
       </FooterContainer>
    );
}

export default Footer;