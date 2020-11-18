'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist,{
        foreignKey:"artist_id"
      });
      this.hasMany(models.Song,{
        foreignKey:"album_id"
      });
    }
  };
  Album.init({
    name: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  }, {
    sequelize,
    underscored:true,
    modelName: 'Album',
  });
  return Album;
};