'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlockedDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BlockedDate.belongsToMany(models.Room, { through: "_RoomsBlockedDates" })
    }
  }
  BlockedDate.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BlockedDate',
  });
  return BlockedDate;
};