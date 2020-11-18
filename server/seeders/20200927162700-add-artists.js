'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Artists',[
      {
        "id": 2,
        "name": "Coldplay",
        "cover_image": "https://i.scdn.co/image/4ffd6710617d289699cc0df60cf975e316025119",
        "created_at": null,
          "updated_at": null
      },
      {
        "id": 5,
        "name": "Green Day",
        "cover_image": "https://i.scdn.co/image/41778f8778469286e6aa9ef751cdc8e942bc0a6f",
        "created_at": null,
          "updated_at": null
      },
      {
        "id": 6,
        "name": "Ocean Alley",
        "cover_image": "https://upload.wikimedia.org/wikipedia/commons/9/9a/OA_LD_-_Primary_Press_Shot.jpg",
        "created_at": null,
          "updated_at": null
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
