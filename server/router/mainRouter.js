const express = require("express")
const router = express.Router()
const {registerUser, loginUser, uploadPhoto, deletePhoto, uploadPost, getAll, showSingle, filterPosts, makeReservation
} = require("../controllers/mainController")
const {registerValidate, uploadPostValidate} = require("../middle/validator");

router.post("/register", registerValidate, registerUser)
router.post("/login", loginUser)
router.post("/uploadPhoto", uploadPhoto)
router.post("/deletePhoto", deletePhoto)
router.post("/uploadPost", uploadPostValidate, uploadPost)
router.get("/main", getAll)
router.get("/showSingle/:_id", showSingle)
router.post("/filterPosts", filterPosts)
router.post("/reserve", makeReservation)


module.exports = router