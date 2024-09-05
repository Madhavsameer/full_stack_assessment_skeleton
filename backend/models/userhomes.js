'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userhomes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userhomes.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
    },
    home_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'homes',
            key: 'id'
          },
      },
    
  }, {
    sequelize,
    modelName: 'userhomes',
    timestamps: false
  });
  return userhomes;
};