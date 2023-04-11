const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Community extends Model {}
Community.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "community",
  }
);
module.exports=Community