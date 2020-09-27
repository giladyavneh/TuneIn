'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Artists',[
      {
        "id": 2,
        "name": "Coldplay",
        "cover_image": "https://scontent.ftlv16-1.fna.fbcdn.net/v/t1.0-9/83747965_10163726359590253_4210307239827275554_o.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=l1d31fadLQ4AX8zySkc&_nc_ht=scontent.ftlv16-1.fna&oh=49c627339a8b3cbe97cbf8b2bc705948&oe=5F864CF5",
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
