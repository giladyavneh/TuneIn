'use strict';
const bcrypt=require("bcrypt")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Interaction,{
        foreignKey:"user_id"
      })
      this.hasMany(models.Playlist,{
        foreignKey:"author_id",
        as:'User'
      });
      this.belongsToMany(models.Playlist,{
        as:"Followed",
        through:"user_playlist"
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: {
      type:DataTypes.STRING,
      set(value){
        this.setDataValue("password",bcrypt.hashSync(value,10))
      }
    },
    email: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN,
    preferences: DataTypes.JSON,
    remember_token: DataTypes.STRING
  }, {
    sequelize,
    underscored:true,
    modelName: 'User',
  });
  return User;
};