const validator = require("email-validator");

module.exports = {
    registerValidate: (req, res, next) => {
        const {email, password1, password2} = req.body

        if (!validator.validate(email)) return res.send({success: false, message: "bad credentials"})
        if (password1.length < 4 || password1.length > 20) return res.send({success: false, message: "bad password1"})
        if (password2.length < 4 || password2.length > 20) return res.send({success: false, message: "bad password2"})

        next()
    },
    uploadPostValidate: (req, res, next) => {
        const {photos, city, price, description} = req.body

        if (photos.length < 1) return res.send({success: false, message: "please upload at least one photo"})
        if (city.length === 0) return res.send({success: false, message: "please fill city box"})
        if (price.length === 0) return res.send({success: false, message: "please fill price box"})
        if (description.length === 0) return res.send({success: false, message: "please fill description box"})

        next()
    }
}