const config = require('config');
const Router = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Event = require('../models/Event');
const {check, validationResult} = require('express-validator');
const router = new Router();

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
    ],
    async (req, res) => {
        try {
            const {
                name,
                city,
                email,
                grade,
                country,
                password,
                telegram,
                instagram,
                dateOfBirth,
                affiliation,
                phoneNumber,
                volunteeringHours
            } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Uncorrect request',
                    errors
            });};
            
            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`});
            };

            const type = "Volunteer";
            const code = "";
            const hashPassword = await bcrypt.hash(password, 8);
            const user  = new User({
                name,
                city,
                code,
                type,
                email,
                grade,
                country,
                password: hashPassword,
                telegram,
                instagram,
                dateOfBirth,
                affiliation,
                phoneNumber,
                volunteeringHours
            });

            await user.save();
            return res.json({message: 'User was created'});
        } catch (error) {
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
            
            const token = jwt.sign(
                {id: user.id},
                config.get("secretKey"),
                {expiresIn: '1h'}
            );

            return res.json({
                token,
                user: {
                    id: user.id,
                    type: user.type,
                    email: user.email
                }
            });
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/profile',
    async (req, res) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});
            return res.json({
                    name: user.name,
                    city: user.city,
                    grade: user.grade,
                    email: user.email,
                    country: user.country,
                    telegram: user.telegram,
                    instagram: user.instagram,
                    phoneNumber: user.phoneNumber,
                    affiliation: user.affiliation,
                    dateOfBirth: user.dateOfBirth,
                    volunteeringHours: user.volunteeringHours
            });
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/events',
    async (req, res) => {
        try {
            const event = await Event.find();
            return res.json(event);
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.put('/code',
    async (req, res) => {
        try {
            const {code, email} = req.body;
            const user = await User.findOne({email});
            user.code = code;
            await user.save();
        } catch (error) {
            res.send({message: 'Server error'});
        }
});

router.post('/check',
    async (req, res) => {
        try {
            const {code} = req.body;
            const user = await User.findOne({code});
            return res.json(user);
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
);

router.post('/attend',
    async (req, res) => {
        try {
            const {email, name, _id} = req.body;
            const event = await Event.findOne({_id});
            const cus = {email: email, name: name, came: false};
            event.attended = [...event.attended, cus];
            await event.save();
            return res.json({message: 'User attended'});
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
)

router.post('/leave',
    async (req, res) => {
        try {
            const {email, _id} = req.body;
            const event = await Event.findOne({_id});
            event.attended = event.attended.filter(item => item.email !== email);
            await event.save();
            return res.json({message: 'User left'});
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
)

module.exports = router;