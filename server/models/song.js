'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist,{
        foreignKey:"artist_id"
      });
      this.belongsTo(models.Album,{
        foreignKey:"album_id"
      });
      this.hasMany(models.Interaction,{
        foreignKey:"song_id"
      });
      this.belongsToMany(models.Playlist,{
        through:"song_playlist"
      })
    }
  };
  Song.init({
    title: DataTypes.STRING,
    track_number: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    length: DataTypes.TIME,
    youtubeLink: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    underscored:true,
    modelName: 'Song',
  });
  return Song;
};