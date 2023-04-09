const sequelize = require('../config/connection');
const { User, Community } = require('../models');
const communityData = require('./community.json');
const userData = require('./userData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const community = await Community.bulkCreate(communityData, {
    individualHooks: true,
    returning: true,
  });
 process.exit(0)
};

seedDatabase();