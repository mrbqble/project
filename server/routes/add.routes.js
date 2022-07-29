const Router = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Report = require('../models/Report');
const router = new Router();

router.post('/events',
    async (req, res) => {
        try {
            const event = await Event.find();
            return res.json(event);
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/users',
    async (req, res) => {
        try {
            const user = await User.find({}, {name: 1, email: 1, volunteeringHours: 1, came: 1});
            return res.json(user);
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/report', 
    async (req, res) => {
        try {
            const {eventid} = req.body;
            const candidate = await Report.findOne({eventid});

            if (candidate) {
                return res.json({message: `Report with id ${eventid} already exist`});
            };

            const report = new Report(req.body);
            await report.save();

            return res.json({message: "Report was created"});
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
)

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
            return res.json({
                user: {
                    name: user.name,
                    country: user.country,
                    volunteeringHours: user.volunteeringHours,
                    type: user.type
                }
            });
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
);

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
);

module.exports = router;