const express = require("express");
const fs = require('fs');

const users = require("./MOCK_DATA.json");
const { error } = require("console");
const mongoose = require("mongoose");
const app = express();

const PORT = 8000;
//connect mongodb to mongoose

mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1').then(() => console.log("MongoDB Connected")).catch(err => console.log('Mongo Error'));

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    gender: {
        type: String,
    }
});

const User = mongoose.model("user", userSchema);

//middle ware _ pulgin

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('req_data.txt', `\n${Date.now()}: ${req.method}: ${req.path}`, (error, data) => {
        next();
    });
})

app.use((req, res, next) => {
    console.log("hello from middle ware 1 ");
    next();
})


app.get("/api/users", (req, res) => {
    return res.json(users);
})

//agar kai sare routes pe hame defferet requests karni hain to ham is tarah se karte hian pahle hi routes defiene kar dete hain

app.route("/api/users/:id").get(
    (req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    }
)
    .patch((req, res) => {
        const body = req.body;
        console.log(body);
    })

    .delete((req, res) => {
        const id = Number(req.params.id);
        console.log(id);
        const index = users.indexOf()
        users.pop(index)

        return res.json({ status: "deleted" });
    })

//agar body ko direct console.log karenge to kuch bhi print nahi hoga usko
//  print karne ke liye hame ek middle ware user kya hai user abhi ham plugin bol rhe hain
// yha pe post man se req aayegi and print hogi uske bad users ki list me add ho jayegi or res me success and userlength send hogi 

// app.post("/api/users", (req, res) => {

//     const body = req.body;
//     console.log(body);
//     users.push({ id: users.length + 1, ...body });
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//         return res.json({ status: "success", id: users.length });
//     });

// })

app.post("/api/users", async (req, res)=> {
    const body = req.body;

    if( !body.firstName || !body.lastName|| !body.gender || !body.email){
        return res.status(400).json({msg: "All fields are required"});
    }
const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName, 
    email : body.email,
    gender : body.gender,
});

console.log(result);

return res.status(201).json({ msg : "success"});
})

// // id is a variable 
// app.get("/api/users/:id", (req , res)=> {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })







// app.post("/api./users", (req, res)=>{
//     //create new user
//     return res.json({status: "Pending"})
// })

// // edit the user with id 

// app.patch("/api./users/:id", (req, res)=>{
//     return res.json({status: "Pending"})
// })

// // to delete the user with id 
// app.delete("/api./users/:id", (req, res)=>{
//     return res.json({status: "Pending"})
// })



app.listen(PORT, () => console.log(`Server Started at Port : ${PORT}`));