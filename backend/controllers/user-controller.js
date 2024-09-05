const { UserService } = require('../services');
const { SuccessResponse, ErrorResponse} = require('../utils/common');

async function findAllUsers(req, res) {
    try {
        const users = await UserService.findAllUsers();
        SuccessResponse.data = users
        return res
                .status(200)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function findUsersByHome(req, res) {
    try {
        const users = await UserService.findUsersByHome(req.params.id);
        SuccessResponse.data = users;
        return res
                .status(200)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


module.exports = {
    findAllUsers,
    findUsersByHome
}