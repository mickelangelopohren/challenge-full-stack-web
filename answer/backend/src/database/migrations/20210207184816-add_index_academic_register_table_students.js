module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'students',
      ['academic_register'],
      {
        indexName: 'academic_register_index',
        indicesType: 'UNIQUE'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('students', ['academic_register']);
  }
};
