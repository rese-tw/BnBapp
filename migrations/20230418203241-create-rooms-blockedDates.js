'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("__RoomsBlockedDates", {
      RoomID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "id",
        },
        allowNull: false,
        constraints: false
      },
      BlockedDateId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BlockedDates",
          key: "id",
        },
        allowNull: false,
        constraints: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("__RoomsBlockedDates");
  }
};
