//Will input user criteria (id, name, email, password and bcrypt hash)
const { Model, DataTypes } = require("sequelize");

const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
// const { validate } = require("json-schema");
// const { update } = require("lodash");
class User extends Model{
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}
User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_name:{
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
            allowNull:false,
            validate: {
                len: [8]
            },
        },
    },

    {
     hooks: {
        beforeCreate: async (newUserPass) => {
            newUserPass.password = await bcrypt.hash(newUserPass.password, 10);
            return newUserPass;
        },
        //* If we decided to include updating a password 
        // beforeUpdate: async (updateUserPass) => {
        //     updateUserPass.password = await bcrypt.hash(updateUserPass.password, 10);
        //     return updateUserPass;
        // },
     },   
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "User",
      }
);
module.exports = User;