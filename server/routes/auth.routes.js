const config = require('config');
const Router = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const router = new Router();

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Uncorrect request',
                    errors
            });};

            const hashPassword = await bcrypt.hash(req.body.password, 8);
            req.body.password = hashPassword;
            req.body.type = "Volunteer";
            req.body.code = "";
            req.body.came = false;

            const user = new User(req.body);
            await user.save();

            return res.json({message: 'User was created'});
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

            const isPassValid = bcrypt.compareSync(password, user.password);
            
            if (!isPassValid) {
                return res.json({message: 'Invalid password'});
            };
            
            const token = jwt.sign(
                {id: user.id},
                config.get("secretKey"),
                {expiresIn: '1h'}
            );

            return res.json(token);
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/profile',
    async (req, res) => {
        try {
            const {email, token} = req.body;
            let user;

            if (email) {
                user = await User.findOne({email});
            } else {
                const _id = jwt_decode(token).id;
                user = await User.findOne({_id});
            }

            user.password = "";

            return res.json(user);
        } catch (error) {
            res.send({message: 'Server error', error});
        };
});

module.exports = router;