import {Post} from "../models/post.model.js";

// Get All Post
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            massage: "Get All Post Successfully",
            count: posts.length,
            posts
        });
    } catch (error) {
        return res.status(500).json({massage: "Internal Server Error"});
    }
}

// Create New Post
export const createPost = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newPost = new Post({title, content, owner: req.user._id});
        const post = await newPost.save();
        return res.status(201).json({
            massage: "Post Created Successfully",
            post
        })
    } catch (error) {
        return res.status(500).json({massage: "Internal Server Error"});
    }
}
