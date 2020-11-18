'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song_playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  song_playlist.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {
    sequelize,
    underscored:true,
    modelName: 'song_playlist',
  });
  return song_playlist;
};