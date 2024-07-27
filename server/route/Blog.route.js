const express = require('express')
const { fetchPosts, AddNewPost, DeletePost, UpdatePost } = require('../controller/BlogController')





const blogRouter = express.Router()



blogRouter.get('/', fetchPosts)
blogRouter.post('/add', AddNewPost)
blogRouter.delete('/delete/:id', DeletePost)
blogRouter.put('/update/:id', UpdatePost)


module.exports = blogRouter