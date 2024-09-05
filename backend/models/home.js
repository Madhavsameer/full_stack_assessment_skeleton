'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsToMany(models.users, { through: 'userhomes',  foreignKey: 'home_id',
            otherKey: 'user_id'} );
    }
  }
  homes.init({
    street_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      zip: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      sqft: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      beds: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      baths: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      list_price: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
  }, {
    sequelize,
    modelName: 'homes',
    timestamps: false
  });
  return homes;
};