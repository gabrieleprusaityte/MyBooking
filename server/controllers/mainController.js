const userSchema = require("../schemas/userSchema");
const postSchema = require("../schemas/postSchema");
const bookingSchema = require("../schemas/bookingSchema")
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

let photos = []

module.exports = {
    registerUser: async (req, res) => {
        const {email, password1: password, isAdmin} = req.body

        const hash = await bcrypt.hash(password, 10)

            const user = new userSchema
            user.email = email
            user.password = hash
            user.isAdmin = isAdmin
            await user.save()
            res.send({success: true, user})
    },
    loginUser: async (req, res) => {
        const {email, password, loggedIn} = req.body

        const findUser = await userSchema.findOne({email})

        const compareResult = await bcrypt.compare(password, findUser.password)

        if(compareResult) {
            req.session.loggedIn = loggedIn
            return res.send({success: true, user: {email, id: findUser._id}})
        }
        res.send({success: false, message: "bad credentials"})
    },
    uploadPhoto: async (req, res) => {
        const {photo, userId: _id} = req.body

        const userUpload = await userSchema.findOne({_id})

        if (userUpload.isAdmin === true) {
            const photoToUpload = {
                photo,
                id: uuidv4()
            }
            photos.push(photoToUpload)
            res.send({success: true, photos})
        } else {
            return res.send({success: false, message: "posts may be uploaded only by admin"})
        }
    },
    deletePhoto: (req, res) => {
        const {id} = req.body
        photos = photos.filter(x => x.id !== id)

        res.send(photos)
    },
    uploadPost: async (req, res) => {
        const {userId: _id, city, price, description} = req.body

        const postToUpload = {
            photos: photos,
            city,
            price,
            description
        }

        const checkUser = await userSchema.findOne({_id})

        if (checkUser.isAdmin) {
            const post = new postSchema
            post.photos = postToUpload.photos
            post.city = postToUpload.city
            post.price = postToUpload.price
            post.description = postToUpload.description
            await post.save()

            const posts = await postSchema.find()

            res.send({success: true, posts})
        } else {
            return res.send({success: false, message: "posts may be uploaded only by admin"})
        }
    },
    getAll: async (req, res) => {
        const posts = await postSchema.find()
        res.send({success: true, posts})
    },
    showSingle: async (req, res) => {
        const {_id} = req.params

        const findPost = await postSchema.findOne({_id})

        res.send(findPost)
    },
    filterPosts: async (req, res) => {
        const {city, price} = req.body

        const filter = city.length === 0 ? {price} : {city, price} || price.length === 0 ? {city} : {city, price}

        const posts = await postSchema.find(filter)

        res.send({success: true, posts})
    },
    makeReservation: async (req, res) => {
        const {userId, postId, bookingDate} = req.body

        const booking = new bookingSchema
        booking.userId = userId
        booking.postId = postId
        booking.bookingDate = bookingDate
        await booking.save()

        const bookings = await bookingSchema.find({postId})

        const userBooking = await bookingSchema.find({userId})

        res.send({bookings, userBooking})
    },
}