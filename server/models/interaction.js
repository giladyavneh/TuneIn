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
      
    }
  };
  Interaction.init({
    userId: {
      type:DataTypes.INTEGER,
      references:{
        model:User,
        key:'id'
      }
    },
    songId: {
      type:DataTypes.INTEGER,
      references:{
        model:Song,
        key:'id'
      }
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