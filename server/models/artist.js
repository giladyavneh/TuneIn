'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.Album,{
          foreignKey:"artist_id"
        });
        this.hasMany(models.Song,{
          foreignKey:"artist_id"
        });
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    coverImage: DataTypes.STRING
  }, {
    sequelize,
    underscored:true,
    modelName: 'Artist',
  });
  return Artist;
};