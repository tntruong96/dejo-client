


import React from 'react';
import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { IBlog } from 'interfaces/blog.interface';
import { useRouter } from 'next/router';
import { message } from 'antd';

interface Props {
    blogContent: IBlog    
    [key: string]: any
}


const BlogContent: NextPage<Props> = ({blogContent}) => {
const router = useRouter();

const handleDelete = async (id: number) => {
    const {data} = await axios.delete(`${process.env.URL_API}/blog/delete/${id}`);
    if(data){
        message.success("Deleted!!",1)
        router.push("/blog");
    }
} 

const handleUpdate = () => {
    
}



    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='self-end flex w-32'>
                <button className='btn' onClick={() => handleDelete(blogContent.id)}><FontAwesomeIcon icon={faTrashCan}/> </button>
                <button className='btn' onClick={handleUpdate}><FontAwesomeIcon icon={faPenToSquare} /></button>
            </div>
            <h1 className='my-5'>{blogContent.title}</h1>
            <div className="w-full p-4 flex justify-center">
            <Image
                unoptimized={true}
                width={400}
                height={400}
                objectFit="cover"
                src={blogContent.thumb}
                alt=""
            />
            </div>
            <div className='my-5 w-full sm:w-2/3 p-5 flex justify-center' dangerouslySetInnerHTML={{__html: `${blogContent.content}`}}></div>

        </div>
    );
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params?.slug as string;
    const { data: blogContent } = await axios.get(`http://dev.dejosaigon.vn/api/blog/${slug}`) // your fetch function here 

    // const blogContent = blogs.find((blog) => blog.slug === slug);

    if(!blogContent){
        return {
            notFound: true
        }
    }
    return {
        props: { 
            blogContent
        }
    }
}



export default BlogContent;