const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log request body

        const { error } = validate(req.body);
        if (error) {
            console.log('Validation error:', error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log('User already exists:', req.body.email);
            return res.status(409).send({ message: 'User with given email already exists!' });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        console.log('User created successfully');
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
