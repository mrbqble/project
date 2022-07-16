const Router = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const router = new Router();

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
    ],
    async (req, res) => {
    try {

        const {email, password, name, dateOfBirth, country, city, affiliation, grade, phoneNumber, instagram, telegram, volunteeringHours} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Uncorrect request', errors});
        }
        
        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: `User with email ${email} already exist`})
        };

        const hashPassword = await bcrypt.hash(password, 8);
        const user  = new User({email, password: hashPassword, name, dateOfBirth, country, city, affiliation, grade, phoneNumber, instagram, telegram, volunteeringHours});
        await user.save();
        return res.json({message: 'User was created'})

    } catch (error) {
        console.log(error);
        res.send({message: 'Server error'});
    };
});

router.post('/login',
    async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(400).json({message: "User not found"});
        };

        const isPassValid = bcrypt.compareSync(password, user.password);
        
        if (!isPassValid) {
            return res.status(400).json({message: 'Invalid password'});
        };
        
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: '1h'});
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error);
        res.send({message: 'Server error'});
    };
});

router.post('/profile',
    async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        return res.json({
                email: user.email,
                name: user.name,
                dateOfBirth: user.dateOfBirth,
                country: user.country,
                city: user.city,
                affiliation: user.affiliation,
                grade: user.grade,
                phoneNumber: user.phoneNumber,
                instagram: user.instagram,
                telegram: user.telegram,
                volunteeringHours: user.volunteeringHours
        })
    } catch (error) {
        console.log(error);
        res.send({message: 'Server error'});
    };
});

router.post('/events',
    async (req, res) => {
    try {
        const event = await Event.find();
        return res.json(event);

    } catch (error) {
        console.log(error);
        res.send({message: 'Server error'});
    };
});

module.exports = router;