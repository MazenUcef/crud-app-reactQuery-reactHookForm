const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./route/Blog.route.js')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://mazenafifi1999:mazenafifi1999@crud-post-app.zedsdyv.mongodb.net/?retryWrites=true&w=majority&appName=crud-post-app`)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => console.log(err));

app.use('/api/blogs', blogRouter);
app.use('/api', (req, res) => {
    res.send("Hello World");
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
