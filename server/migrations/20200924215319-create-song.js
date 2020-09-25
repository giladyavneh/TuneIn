'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      track_number: {
        type: Sequelize.INTEGER
      },
      lyrics: {
        type: Sequelize.TEXT
      },
      length: {
        type: Sequelize.TIME
      },
      youtube_link: {
        type: Sequelize.STRING
      },
      artist_id: {
        type: Sequelize.INTEGER
      },
      album_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Songs');
  }
};