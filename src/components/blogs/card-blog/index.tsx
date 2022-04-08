

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
            <p className='mb-0 text-xl font-bold'>{blog.title}</p>
            <p>{convertDate(blog.createdAt)}</p>
            <Image
                unoptimized={true}
                width={300}
                height={300}
                objectFit="cover"
                src={`${process.env.NEXT_PUBLIC_URL_WEB}/${blog.thumb}`}
                alt=""
            />
            {/* <div dangerouslySetInnerHTML={{__html: `${blog.content}`}}></div> */}
        </CardContainer>
    );
}

export default CardBlog;