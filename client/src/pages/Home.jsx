import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const queryClient = useQueryClient();

    const { data: blogs, isError, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/blogs');
                return res.data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });

    const { mutate: deleteBlog } = useMutation({
        mutationFn: async (postId) => {
            try {
                const res = await axios.delete(`http://localhost:5000/api/blogs/delete/${postId}`);
                return res.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        }
    });

    const navigate = useNavigate();

    const handleEdit = (currentBlog) => {
        navigate('/create', { state: { currentBlog } });
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className='w-full flex flex-col items-center min-h-screen p-10'>
            <h1 className='mb-10 text-5xl font-bold text-yellow-600'>List Of Blogs</h1>
            <div className='w-full flex flex-col items-center mx-auto gap-5'>
                {blogs?.blogPosts && blogs?.blogPosts?.length > 0 ? (
                    blogs.blogPosts.map((blog) => (
                        <div className='border-2 w-full mx-auto' key={blog?._id}>
                            <h2>Title: {blog?.title}</h2>
                            <p>Content: {blog?.content}</p>
                            <p>By: {blog?.author}</p>
                            <FaTrash
                                onClick={() => deleteBlog(blog?._id)}
                                className='cursor-pointer text-red-600'
                                size={25}
                            />
                            <FaEdit
                                onClick={() => handleEdit(blog)}
                                className='cursor-pointer text-blue-600 ml-5'
                                size={25}
                            />
                        </div>
                    ))
                ) : "No Posts To Show"}
            </div>
        </div>
    );
};


export default Home