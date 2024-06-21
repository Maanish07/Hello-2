
import express from 'express';
import User from '../models/User.js'
import {body ,validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/signup',
[body('email').isEmail(),
body('name'),
body('password').isLength({min : 5})],
async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPassword,
            role: req.body.role
        }).then(user => {
            console.log("User registered successfully:", user);
            res.status(200).json({ message: "User registered successfully", user: user });
        })
    } 
    catch (error) {
        res.status(400).send(error);
    }
});

router.get('/signup', async (req, res) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser);
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    
});

export default router;