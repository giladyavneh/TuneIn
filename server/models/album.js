"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Artist, { foreignKey: "artist_id" });
    }
  }
  Album.init(
    {
      name: DataTypes.STRING,
      artist_id: DataTypes.INTEGER,
      cover_image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Album",
    }
  );
  return Album;
};
