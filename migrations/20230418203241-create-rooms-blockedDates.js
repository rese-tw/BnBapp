'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("_RoomsBlockedDates", {
      RoomID: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "id",
        },
        allowNull: false,
      },
      BlockedDateId: {
        type: Sequelize.INTEGER,
        references: {
          model: "BlockedDates",
          key: "id",
        },
        allowNull: false,
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
    await queryInterface.dropTable("_RoomsBlockedDates");
  }
};
