const { sequelize } = require('../../src/app/models');

const clearDatabase = async () => Promise.all(
  Object.values(sequelize.models).map(function(model) {
    return model.destroy({ truncate: true, force: true });
  })
);

const syncDatabase = async () => sequelize.sync({ force: true });

module.exports = {
  clearDatabase,
  syncDatabase,
};
