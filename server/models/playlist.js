'use strict';
const {Song}=require("../models")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{
        foreignKey:"author_id",
        as:'User'
      });
      this.belongsToMany(models.User,{
        as:"Followers",
        through:"user_playlist"
      });
      this.belongsToMany(models.Song,{
        through:"song_playlist"
      });
    }
    async addSongsById(arr,model){
      let pendings=[]
      for (let id of arr){
        pendings.push( await model.findByPk(id));
      };
      Promise.all(pendings).then(res=>this.addSongs(res))
    }
  };
  Playlist.init({
    name: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    coverImage: DataTypes.STRING
  }, {
    sequelize,
    underscored:true,
    modelName: 'Playlist',
  });
  return Playlist;
};