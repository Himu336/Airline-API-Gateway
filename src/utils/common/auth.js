const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = require('../../config');

function checkPassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

function createToken(input){
    try {
        return jwt.sign(input, JWT_SECRET, {expiresIn: JWT_EXPIRY})
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    checkPassword,
    createToken
}