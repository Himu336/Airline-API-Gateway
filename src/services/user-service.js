const { UserRepository } = require('../repositories');

const { Auth } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const userRepo = new UserRepository();

async function create(data){
    try {
        const user = await userRepo.create(data);
        return user;
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BadRequest);
        }
        throw new AppError('Error creating a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data){
    try{
        const user = await userRepo.getUserByEmail(data.email);
        if(!user) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }
        const passwordMatch = Auth.checkPassword(data.password, user.password);
        if(!passwordMatch) {
            throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = Auth.createToken({ id: user.id, email: user.email });
        return jwt;

    } catch (error) {
        if(error instanceof AppError) {
            throw error; // Re-throw custom errors
        }
        console.log(error);
        throw new AppError('Something went wrong while signing in', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    create,
    signin
};