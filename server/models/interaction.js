'use strict';
const{Song,User}=require("../models")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Song,{
        foreignKey:"song_id"
      });
      this.belongsTo(models.User,{
        foreignKey:"user_id"
      })
    }
  };
  Interaction.init({
    userId: {
      type:DataTypes.INTEGER,
      
    },
    songId: {
      type:DataTypes.INTEGER,
  
    },
    isLiked: DataTypes.BOOLEAN,
    playCount: DataTypes.INTEGER
  }, {
    sequelize,
    underscored:true,
    modelName: 'Interaction',
  });
  return Interaction;
};