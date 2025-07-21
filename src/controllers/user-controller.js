const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

async function createUser(req, res){
    try {
        const user = await UserService.create({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

async function signin(req, res){
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

async function addRoletoUser(req, res){
    try {
        const user = await UserService.addRoletoUser({
            role: req.body.role,
            id: req.body.id,
        });
        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.message;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
};

module.exports = {
    createUser,
    signin,
    addRoletoUser,
};