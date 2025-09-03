const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const jwtSecretKey = 'ColdWolfKing';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

function createJwToken(id) {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}

exports.signup = async (req, res) => {
    const {username, password, name, email, url} = req.body;
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    await User.create({
        username,
        password: hashed,
        name,
        email,
        url
    });
    res.status(201).json({username});
}