const express = require("express");


const { handleGetAllUsers, handlePostCreateUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById } = require("../controller/user");
const router = express.Router();

router.route("/").get(handleGetAllUsers)
        .post(handlePostCreateUser)


router.route("/:id").get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)



module.exports = router;