const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Image extends Model {}
Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model:"user",
        key: "id"
      },

    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "image",
  }
);
module.exports=Image
