'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Albums', [
      {
        "id": 1,
        "artist_id": 2,
        "name": "Viva la Vida or Death and All His Friends",
        "cover_image": "https://upload.wikimedia.org/wikipedia/he/8/8f/Viva_la_Vida.jpg",
        "created_at": null,
          "updated_at": null
      },
      {
        "id": 2,
        "artist_id": 2,
        "name": "Parachutes",
        "cover_image": "https://upload.wikimedia.org/wikipedia/en/5/57/Coldplayparachutesalbumcover.jpg",
        "created_at": null,
          "updated_at": null
      },
      {
        "id": 3,
        "artist_id": 5,
        "name": "American Idiot",
        "cover_image": "https://i.pinimg.com/originals/88/03/d7/8803d7ec675006ca7c23d244b7ff0104.jpg",
        "created_at": null,
          "updated_at": null
      },
      {
        "id": 4,
        "artist_id": 6,
        "name": "Chiaroscuro",
        "cover_image": "https://upload.wikimedia.org/wikipedia/en/f/fa/Chiaroscuro_by_Ocean_Alley.jpg",
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
