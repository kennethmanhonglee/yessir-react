'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const fakerBusinessesArrays = [];
    for (let i = 0; i < 20; i++) {
      let newBusiness = {};
      fakerBusinessesArrays.push(newBusiness);
    }

    return queryInterface.bulkInsert('Businesses', []);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Businesses', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
