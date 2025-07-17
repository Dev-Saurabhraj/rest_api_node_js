const express = require("express");

const userRouter = require("./routers/route.js");

const {logreqres} = require("./MIddleWare/info.js");
const {connectMongoDb} = require("./connection.js");


const app = express();
const PORT = 8002;


//connect mongodb to mongoose
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(()=> console.log("mongoDbConnected!"));

//middle ware _ pulgin
app.use(express.urlencoded({ extended: false}));

app.use(logreqres("log.txt"));

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`Server Started at Port : ${PORT}`));