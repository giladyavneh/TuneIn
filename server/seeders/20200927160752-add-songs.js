'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Songs', [
        {
          "id": 1,
          "title": "Life in Technicolor",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 1,
          "lyrics": null,
          "length": "00:02:29",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=sPD59NTahc0"
        },
        {
          "id": 2,
          "title": "Cemeteries of London",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 2,
          "lyrics": null,
          "length": "00:03:21",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=v6gxuxw69z0"
        },
        {
          "id": 3,
          "title": "Lost!",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 3,
          "lyrics": null,
          "length": "00:03:55",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=B5KjwuD3hEg"
        },
        {
          "id": 4,
          "title": "42",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 4,
          "lyrics": null,
          "length": "00:03:57",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=ez6eauLcOuc"
        },
        {
          "id": 5,
          "title": "Lovers in Japan / Reign of Love (3:57/2:56)",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 5,
          "lyrics": null,
          "length": "00:06:53",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=A3hiqF3goTU"
        },
        {
          "id": 6,
          "title": "Yes (Chinese Sleep Chant)",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 6,
          "lyrics": null,
          "length": "00:07:06",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=V4qdbGcFBxw"
        },
        {
          "id": 7,
          "title": "Viva la Vida",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 7,
          "lyrics": null,
          "length": "00:04:01",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=3a-q7vPa-UU"
        },
        {
          "id": 8,
          "title": "Violet Hill",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 8,
          "lyrics": null,
          "length": "00:03:42",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=IakDItZ7f7Q"
        },
        {
          "id": 9,
          "title": "Strawberry Swing",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 9,
          "lyrics": null,
          "length": "00:04:09",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=0hnwIedsoNI"
        },
        {
          "id": 10,
          "title": "Death and All His Friends (The Escapist)",
          "artist_id": 2,
          "album_id": 1,
          "track_number": 10,
          "lyrics": null,
          "length": "00:06:18",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=QvoM6TK8O6w"
        },
        {
          "id": 12,
          "title": "Don't Panic",
          "artist_id": 2,
          "album_id": 2,
          "track_number": 1,
          "lyrics": null,
          "length": "00:02:17",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "8uxt-FnNy2I"
        },
        {
          "id": 13,
          "title": "Yellow",
          "artist_id": 2,
          "album_id": 2,
          "track_number": 5,
          "lyrics": null,
          "length": "00:04:32",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=yKNxeF4KMsY"
        },
        {
          "id": 16,
          "title": "American Idiot",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 1,
          "lyrics": null,
          "length": "00:02:54",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "h6Z5N0Z6zH0"
        },
        {
          "id": 17,
          "title": "Jesus of Suburbia 1",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 2,
          "lyrics": null,
          "length": "00:09:08",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "JMcNzjzw63I"
        },
        {
          "id": 18,
          "title": "Holiday",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 3,
          "lyrics": null,
          "length": "00:03:54",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "l2hA8g1cNvQ"
        },
        {
          "id": 19,
          "title": "Boulevard of Broken Dreams",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 4,
          "lyrics": null,
          "length": "00:04:20",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "Dx1SPxGn-iU"
        },
        {
          "id": 20,
          "title": "Are We the Waiting",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 5,
          "lyrics": null,
          "length": "00:02:42",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "6HXa2gVj4mg"
        },
        {
          "id": 21,
          "title": "St. Jimmy",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 6,
          "lyrics": null,
          "length": "00:02:55",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "jRu0O1J3Y4s"
        },
        {
          "id": 22,
          "title": "Give Me Novacaine",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 7,
          "lyrics": null,
          "length": "00:03:25",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "ZKAwIwjHwZI"
        },
        {
          "id": 23,
          "title": "Shes A Rebel",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 8,
          "lyrics": null,
          "length": "00:02:01",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "eOv5fF7maFY"
        },
        {
          "id": 24,
          "title": "Extraordinary Girl",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 9,
          "lyrics": null,
          "length": "00:03:35",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "hctq2W1z7Kc"
        },
        {
          "id": 25,
          "title": "Letterbomb",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 10,
          "lyrics": null,
          "length": "00:04:07",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "1fi-MLyBfB0"
        },
        {
          "id": 26,
          "title": "Wake Me Up When September Ends",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 11,
          "lyrics": null,
          "length": "00:04:45",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "ulRXvH8VOl8"
        },
        {
          "id": 27,
          "title": "Homecoming",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 12,
          "lyrics": null,
          "length": "00:09:18",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "58hUq7hnueQ"
        },
        {
          "id": 28,
          "title": "Whatsername",
          "artist_id": 5,
          "album_id": 3,
          "track_number": 13,
          "lyrics": null,
          "length": "00:04:12",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "Z2LC1xrdOaM"
        },
        {
          "id": 29,
          "title": "Corduroy",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 1,
          "lyrics": null,
          "length": "00:03:14",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=2wmtWFhr_eQ"
        },
        {
          "id": 30,
          "title": "The Comedown",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 2,
          "lyrics": null,
          "length": "00:04:44",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=d5HiHEvP3L0"
        },
        {
          "id": 31,
          "title": "Happy Sad",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 3,
          "lyrics": null,
          "length": "00:05:30",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=8zqfbgMVSLo"
        },
        {
          "id": 32,
          "title": "Confidence",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 4,
          "lyrics": null,
          "length": "00:04:13",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=tEC_2hqwK9Y"
        },
        {
          "id": 33,
          "title": "Knees",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 5,
          "lyrics": null,
          "length": "00:04:46",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=mXlInJ1ZYGI"
        },
        {
          "id": 34,
          "title": "Rage",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 6,
          "lyrics": null,
          "length": "00:04:13",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=mhxdrpQYegY"
        },
        {
          "id": 35,
          "title": "She's Always Right",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 7,
          "lyrics": null,
          "length": "00:04:04",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=Jk__SJqrAQs&list=OLAK5uy_lnYdZer2xdRJpi6nGhBctiwhyzuixN9k4&index=7"
        },
        {
          "id": 36,
          "title": "Frostbite",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 8,
          "lyrics": null,
          "length": "00:03:24",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=CgqgFRecxXk&list=OLAK5uy_lnYdZer2xdRJpi6nGhBctiwhyzuixN9k4&index=8"
        },
        {
          "id": 37,
          "title": "Overgrown",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 9,
          "lyrics": null,
          "length": "00:03:54",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=e3G6OdfHFpQ&list=OLAK5uy_lnYdZer2xdRJpi6nGhBctiwhyzuixN9k4&index=9"
        },
        {
          "id": 38,
          "title": "Bones",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 10,
          "lyrics": null,
          "length": "00:03:19",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=R5EUNCTdjjo&list=OLAK5uy_lnYdZer2xdRJpi6nGhBctiwhyzuixN9k4&index=10"
        },
        {
          "id": 39,
          "title": "Flowers and Booze",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 11,
          "lyrics": null,
          "length": "00:04:03",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=cf0IZMM9KKU&list=OLAK5uy_lnYdZer2xdRJpi6nGhBctiwhyzuixN9k4&index=11"
        },
        {
          "id": 40,
          "title": "Man You Were Looking For",
          "artist_id": 6,
          "album_id": 4,
          "track_number": 12,
          "lyrics": null,
          "length": "00:03:26",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=gllHIucsD8Q&list=OLAK5uy_lnYdZer2xdRJpi6nGhBctiwhyzuixN9k4&index=12"
        },
        {
          "id": 41,
          "title": "Shiver",
          "artist_id": 2,
          "album_id": 2,
          "track_number": 2,
          "lyrics": null,
          "length": "00:04:59",
          "created_at": null,
          "updated_at": null,
          "youtube_link": "https://www.youtube.com/watch?v=u8XFFTWwSvY"
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
