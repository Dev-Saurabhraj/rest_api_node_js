const User = require("../model/api.js");

async function handleGetAllUsers(req, res) {
    const allDbUser = await User.find({});
    return res.json(allDbUser);
}

async function handlePostCreateUser(req, res) {
    const body = req.body;
    console.log(body);
    if (!body.firstName || !body.lastName || !body.gender || !body.email) {
        return res.status(400).json({ msg: "all field are required" })
    }
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
    });

    console.log(result);

    return res.status(201).json({ msg: "success", id: result._id });
}



async function handleGetUserById(req, res){

    const user = await User.find(req.params.id);

     if (!user) return res.status(404).json({error : `No user find by Id ${user}`});
    console.log(user);
     return res.status(200).json(user);
        
}

async function handleUpdateUserById(req, res){
await User.findByIdAndUpdate(req.params.id, {lastName} );
        return res.status(200).json({ status: "Updated" });
}

async function handleDeleteUserById(req, res){
     await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "deleted" });

}


module.exports = { handleGetAllUsers, handlePostCreateUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById}