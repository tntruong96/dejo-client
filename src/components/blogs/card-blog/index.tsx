

import React from 'react';
import PropTypes from 'prop-types';
import { CardContainer } from './styles';
import {convertDate} from '@utils/date'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IBlog } from 'interfaces/blog.interface';

interface Props {
    blog: IBlog
    [key: string]: any
}

const CardBlog: React.FC<Props> =({blog}) => {
    const router = useRouter();
    return (
        <CardContainer onClick={() => router.push(`/blog-detail/${blog.slug}`)} className='flex flex-col items-center justify-center'>
            <h2 className='mb-0'>{blog.title}</h2>
            <p>{convertDate(blog.createdAt)}</p>
            <Image
                unoptimized={true}
                width={300}
                height={300}
                objectFit="cover"
                src={`${process.env.URL_ORI}/${blog.thumb}`}
                alt=""
            />
            {/* <div dangerouslySetInnerHTML={{__html: `${blog.content}`}}></div> */}
        </CardContainer>
    );
}

export default CardBlog;