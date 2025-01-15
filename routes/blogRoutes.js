const express = require('express');
const Blog = require('../models/blog'); // Подключение модели блога
const router = express.Router();
const moment = require('moment');

router.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body); 
        await blog.save();
        res.status(201).json({
            ...blog._doc,
            createdAt: moment(blog.createdAt).format('DD/MM/YYYY HH:mm:ss'),
            updatedAt: moment(blog.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find(); 
        const formattedBlogs = blogs.map(blog => ({
            ...blog._doc,
            createdAt: moment(blog.createdAt).format('DD/MM/YYYY HH:mm:ss'),
            updatedAt: moment(blog.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
        }));
        res.status(200).json(formattedBlogs); 
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({
            ...blog._doc,
            createdAt: moment(blog.createdAt).format('DD/MM/YYYY HH:mm:ss'),
            updatedAt: moment(blog.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true, 
        });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({
            ...blog._doc,
            createdAt: moment(blog.createdAt).format('DD/MM/YYYY HH:mm:ss'),
            updatedAt: moment(blog.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
        });
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id); 
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
