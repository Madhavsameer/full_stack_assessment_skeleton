const CrudRepository = require("./crud-repository");
const {  users, homes } = require('../models');
const { Op } = require("sequelize");
const AppError = require("../utils/error/app-error");

class UserRepository extends CrudRepository{
    constructor() {
        super(users);
    }
    async findUsersByHome(id) {
 
        const data = await homes.findByPk(id, {
            include: {
              model: users,
              through: { attributes: [] }  // Exclude attributes from the join table if not needed
            }
          });
          
    return data;
}

     async findUsersByIds(userIds) {
          const data = await users.findAll({
               where: {
                id: { [Op.in]: userIds }
              }
            });
          if (data.length !== userIds.length) {
            throw new AppError('One or more user IDs are invalid', 404);
             }
    return data;
}
    
}

module.exports = UserRepository;