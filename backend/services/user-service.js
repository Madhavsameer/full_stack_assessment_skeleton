const { UserRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');

const userRepository = new UserRepository();

async function findAllUsers() {
    try {
        const users = await userRepository.getAll();
        return users;
    } catch (error) {
        throw new AppError('Something went wrong while fetching users', 500)
    }
}

async function findUsersByHome(id) {
    try {
        const homes = await userRepository.findUsersByHome(id);
        return homes;
    } catch (error) {
        throw new AppError('Something went wrong while fetching users', 500);
    }
}



module.exports = {
    findAllUsers,
    findUsersByHome
}