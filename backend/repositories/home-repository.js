const CrudRepository = require("./crud-repository");
const {  homes, users, userhomes } = require('../models');
const db = require('../models');
const AppError = require( "../utils/error/app-error");

class HomeRepository extends CrudRepository{
    constructor() {
        super(homes);
    }
    async findHomeByUser(userId, page) {
        const transaction = await db.sequelize.transaction();
        try {
          const pageSize = 50
          const offset = (page - 1) * pageSize;

          const homeIds = await userhomes.findAll({
              where: { user_id: userId },
              attributes: ['home_id'],
              limit: 50,
              offset: offset,
              transaction,
              raw: true
          });

  
          const ids = homeIds.map(record => record.home_id);

          const home= await homes.findAll({
              where: { id: ids },
              transaction
          })
  
          const totalHomes = await userhomes.count({
              where: { user_id: userId },
              transaction
          });
  
          const totalPages = Math.ceil(totalHomes / pageSize);
          await transaction.commit();
          return {
              totalPages: totalPages,
              homes: home
          };
      } catch (error) {
         await transaction.rellback();
          throw new AppError('Something went wrong while fetching homes', 500);
      }
    }
  
}

module.exports = HomeRepository;