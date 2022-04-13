const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require('./routes/user')

app.use(express.json())

app.use('/api/v1/users', userRoutes)

// app.get("/", (req, res) => {
//     res.send("hello world");
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});