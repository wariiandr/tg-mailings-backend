import User from '../schemes/User.js';
import Role from '../schemes/Role.js';
import bcrypt from 'bcryptjs';
import {validationResult} from "express-validator";
import { secret } from '../config.js'
import jwt from 'jsonwebtoken';

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role,
    }

    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { userName, password } = req.body;

            const existingUser = await User.findOne({ userName });

            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
            }

            const salt = bcrypt.genSaltSync(7);
            const hashPassword = bcrypt.hashSync(password, salt);

            const userRole = await Role.findOne({value: 'USER'});

            const user = await User.create({
                userName,
                password: hashPassword,
                role: userRole,
            })

            res.json(user);
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const {userName, password} = req.body;

            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(400).json({message: `Пользователь ${userName} не найден`});
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            const token = generateAccessToken(user._id, user.role);

            return res.json({ token });
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' });
        }
    }
}

export default new AuthController();