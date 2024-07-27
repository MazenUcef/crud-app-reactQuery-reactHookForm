import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'

const AddBlog = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location;
    const currentBlog = state?.currentBlog || {}
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: currentBlog?.title || '',
            content: currentBlog?.content || '',
            author: currentBlog?.author || ''
        }
    })


    // useEffect(() => {
    //     // const { currentBlog } = location.state
    //     if (currentBlog) {
    //         reset({
    //             title: currentBlog?.title,
    //             content: currentBlog?.content,
    //             author: currentBlog?.author
    //         })
    //     }
    // }, [location, reset])
    const { mutate: updatePost } = useMutation({
        mutationFn: async (postId, data) => {
            try {
                const res = await axios.put(`http://localhost:5000/api/blogs/update/${postId}`, data)
                return res.data
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            reset()
            navigate('/')
        }
    })

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async (data) => {
            try {
                const res = await axios.post(`http://localhost:5000/api/blogs/add`, data)
                return res.data
            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            reset()
            navigate("/")
        },
        onError: (err) => {
            console.error(err)
        }

    })



    const onSubmit = (data) => {
        if (currentBlog.id) {
            updatePost(currentBlog.id, data)
        } else {
            console.log(data);
            mutate(data)
        }
    }


    return (
        <div className='w-full flex flex-col items-center justify-center min-h-screen p-10'>
            <h1 className='mb-10 text-4xl font-bold text-yellow-600'>Add a New Blog</h1>
            <div className='flex border-2 border-yellow-600 p-10 w-full flex-col justify-center items-center'>
                <div className='flex mb-5 flex-col justify-center items-center'>
                    <label className='mb-5 font-semibold text-xl' htmlFor='title'>Title</label>
                    <input
                        className='w-[300px] border px-1 py-2'
                        name='title'
                        placeholder='Enter Blog Title'
                        id='title'
                        type='text'
                        {...register('title', {
                            required: "Title Is required"
                        })}
                    />
                    <p>{errors?.title?.message}</p>
                </div>
                <div className='flex mb-5 flex-col justify-center items-center'>
                    <label className='mb-5 font-semibold text-xl' htmlFor='content'>Content</label>
                    <textarea
                        className='w-[300px] border px-1 py-2'
                        name='content'
                        placeholder='Enter Blog content'
                        id='content'
                        type='text'
                        {...register('content', {
                            required: "Content Is required"
                        })}
                    />
                    <p>{errors?.content?.message}</p>
                </div>
                <div className='flex mb-5 flex-col justify-center items-center'>
                    <label className='mb-5 font-semibold text-xl' htmlFor='author'>Author</label>
                    <input
                        className='w-[300px] border px-1 py-2'
                        name='author'
                        placeholder='Enter Blog author'
                        id='author'
                        type='text'
                        {...register('author', {
                            required: "Author Name Is srequired"
                        })}
                    />
                    <p>{errors?.author?.message}</p>
                </div>
                <div>
                    <button className='mt-10 py-3 px-4 bg-yellow-600 rounded-lg font-bold' type='button' onClick={handleSubmit(onSubmit)}>
                        Add Blog
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddBlog