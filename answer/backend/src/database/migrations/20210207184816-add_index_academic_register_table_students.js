module.exports = {
  up: async (queryInterface) => queryInterface.addIndex(
    'students',
    ['academic_register'],
    {
      indexName: 'academic_register_index',
      indicesType: 'UNIQUE',
    },
  ),

  down: async (queryInterface) => queryInterface.removeIndex('students', ['academic_register']),
};
