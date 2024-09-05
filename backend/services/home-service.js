const { HomeRepository, UserRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const db = require('../models');

const homeRepository = new HomeRepository();
const userRepository = new UserRepository();

async function findHomeByUser({id, page}) {
    try {
        const homes = await homeRepository.findHomeByUser(id, page);
        return homes;
    } catch (error) {
        throw new AppError('Something went wrong while fetching users', 500);
    }
}

async function updateUsers(data) {
    const {homeId, userIds} = data;
    const transaction = await db.sequelize.transaction();
    try {
        const homes = await homeRepository.get(homeId, transaction);
        const users = await userRepository.findUsersByIds(userIds,transaction );
        await homes.setUsers(users, transaction);
        transaction.commit();
        return users;
    } catch (error) {
        transaction.rollback();
        if(error instanceof AppError) {
            throw error;
        }
        throw new AppError('Something went wrong while fetching users', 500);
    }
}


module.exports = {
    findHomeByUser,
    updateUsers
}