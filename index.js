const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRoutes = require('./routes/user')
const reflectionsRoutes = require('./routes/reflections')

app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/reflections', reflectionsRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app