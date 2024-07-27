const Blog = require('../model/BlogModel.js')
const mongoose = require('mongoose')

const fetchPosts = async (req, res) => {
    try {
        const blogPosts = await Blog.find();
        if (!blogPosts) {
            return res.status(404).json({ message: "Posts not found" });
        }
        res.status(200).json({ blogPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while fetching posts" });
    }
};

const AddNewPost = async (req, res) => {
    const { title, content, author } = req.body;
    const currDate = new Date();
    const newPost = new Blog({
        title,
        content,
        author,
        date: currDate
    });
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await newPost.save({ session });
        await session.commitTransaction();
        res.status(200).json({ newPost });
    } catch (error) {
        await session.abortTransaction();
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error while adding new post" });
    } finally {
        session.endSession();
    }
};


const DeletePost = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPost = await Blog.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while deleting" });
    }
};


const UpdatePost = async (req, res) => {
    const id = req.params.id;
    const { title, content, author } = req.body;
    try {
        const postToUpdate = await Blog.findByIdAndUpdate(id, { title, content, author }, { new: true });
        if (!postToUpdate) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ postToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error while updating" });
    }
};


module.exports = { fetchPosts, AddNewPost, DeletePost, UpdatePost };
