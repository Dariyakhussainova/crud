const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', blogRoutes);

app.get('/', async (req, res) => {
    res.send("Hello");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose
    .connect('mongodb+srv://dariyakhussainova:W2FSiAabfWLJW8cH@cluster0.bs4wn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Connection successful");
    })
    .catch(() => {
        console.log("Connection failed");
    });

