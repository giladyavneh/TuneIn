'use strict';
const {
    Model
}=require("sequelize")


module.exports=(sequelize,DataTypes)=>{
    class Artist extends Model{
        static associate(models){
            this.hasMany(models.Album ,{foreignKey:"artist_id"})
        };
        static async delete(id){
            this.destroy({where:{id}})  
        };
    };
    Artist.init({
        name:DataTypes.STRING,
        cover_image:DataTypes.STRING,
        createdAt:{
            type:DataTypes.DATE,
            defaultValue:sequelize.NOW
        }
    },{
        sequelize,
        modelName:'Artist'
    });
    return Artist;
};