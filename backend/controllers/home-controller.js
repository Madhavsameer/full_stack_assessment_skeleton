const { HomeService } = require('../services');
const { SuccessResponse, ErrorResponse} = require('../utils/common');

async function findHomeByUser(req, res) {
    try {
        const homes = await HomeService.findHomeByUser({
        id: req.params.id,
        page: req.query.page
        });
        SuccessResponse.data = homes;
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

async function updateUsers(req, res) {
    try {
        const homes = await HomeService.updateUsers({
            homeId: req.params.id,
            userIds: req.body.userIds
        });
        SuccessResponse.data = homes;
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
    findHomeByUser,
    updateUsers
}