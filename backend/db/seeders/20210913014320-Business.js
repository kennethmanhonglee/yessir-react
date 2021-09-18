"use strict";

const faker = require("faker");

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
    for (let i = 0; i < 50; i++) {
      let amountUsers = 53; //52 faker users + 1 demo user
      let ownerId = Math.floor(Math.random() * amountUsers) + 1; //+1 to get 1-max
      let title = faker.company.companyName();
      let description = faker.commerce.productDescription();
      let address = faker.address.streetAddress();
      let city = faker.address.city();
      let state = faker.address.state();
      let zipCode = faker.address.zipCode();

      let newBusiness = {
        ownerId,
        title,
        description,
        address,
        city,
        state,
        zipCode,
      };

      fakerBusinessesArrays.push(newBusiness);
    }

    return queryInterface.bulkInsert("Businesses", fakerBusinessesArrays);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Businesses", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
