module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academicRegister: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'academic_register',
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      indexes:[
        {
          unique: true,
          fields:['academicRegister']
        }
      ]
    }
  );

  return Student;
};

