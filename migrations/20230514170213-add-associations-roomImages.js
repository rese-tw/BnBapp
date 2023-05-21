'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "Images", // name of Source model
      "RoomId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "Images", // name of Source model
      "RoomId" // key we want to remove
    );
  }
};
