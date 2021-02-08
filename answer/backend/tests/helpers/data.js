const getRandomInt = (min = 111111111, max = 999999999 ) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createStudentData = (newOpts) => ({
  name: 'Paula Souza',
  email: 'paula.souza@teste.com',
  academicRegister: `${getRandomInt()}`,
  document: '49116966058',
  ...newOpts
});

module.exports = {
  createStudentData,
}
