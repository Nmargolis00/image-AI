const User=require('./user')
const Image=require('./image')
const Community=require('./community')

Image.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete:"cascade"
  
  });
 
  User.hasMany(Image, {
    foreignKey: 'user_id',
    onDelete:"cascade"
  });

module.exports={User,Image,Community}