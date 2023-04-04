//Will input user criteria (id, name, email, password and bcrypt hash)
const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
const bcrypt = require('bcrypt');
class User extends Model{}
User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        last_name:{
            type: DataTypes.STRING(100),
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validator:{
                isEmail: { args: true, msg: 'email format is not correct' },
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        }
    }
    ,
    {
        
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
      }
)
module.exports=User