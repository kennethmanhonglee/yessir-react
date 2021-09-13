'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fakerUserArray = [];
    for (let i = 0; i < 20; i++) {
      let newUsername = faker.internet.userName();
      let newEmail = faker.internet.email();
      let newPassword = faker.internet.password();

      let newUser = { username: newUsername, email: newEmail, hashedPassword: bcrypt.hashSync(newPassword) };

      fakerUserArray.push(newUser);
    }

    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      }, ...fakerUserArray
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, { truncate: true, cascade: true, restartIdentity: true });
  }
};