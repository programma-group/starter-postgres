const getCorrectUserData = () => ({
  username: 'inserted_user',
  password: '123456',
  email: 'inserted_user@admin.com',
  firstName: 'Inserted',
  lastName: 'User',
});

const getOmittedData = (field) => {
  const correctData = getCorrectUserData();
  delete correctData[field];
  return correctData;
};

module.exports = {
  getCorrectUserData,
  getOmittedData,
};
