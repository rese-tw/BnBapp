'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsToMany(models.BlockedDate, { 
        through: "_RoomsBlockedDates",
        onDelete: 'cascade'
       }),
      Room.hasMany(models.Image)
    }
  }
  Room.init({
    roomTitle: DataTypes.STRING,
    dailyRate: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};