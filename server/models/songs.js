'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    
    static associate(models) {
      this.belongsTo(models.Artist,
        {
          foreignKey:"artist_id"
        });
        this.belongsTo(models.Album,{
          foreignKey:"album_id"
        })
    }
  };
  Song.init({
    name: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER,
    track_number: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    length: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Songs',
  });
  return Song;
};