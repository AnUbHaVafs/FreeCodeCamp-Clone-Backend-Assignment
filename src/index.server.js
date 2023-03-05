const express = require('express')
const env = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

env.config();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())


async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/freecodecamp');
    } catch (error) {
        handleError(error);
    }
}
connect();

//Routes
const userRoutes = require('./routes/userRoute');
const courseRoutes = require('./routes/courseRoute');

app.use(cors());
app.use('/api', userRoutes);
app.use('/api', courseRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} `)
})

