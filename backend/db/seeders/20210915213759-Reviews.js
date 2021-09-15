'use strict';

const faker = require('faker');

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
    const fakerReviewsArray = [];
    for (let i = 0; i < 100; i++) {
      let amountUsers = 23; //22 faker users + 1 demo user
      let userId = Math.floor(Math.random() * amountUsers) + 1;
      let amountBusinesses = 20; //22 faker businesses
      let businessId = Math.floor(Math.random() * amountBusinesses) + 1;
      let rating = Math.floor(Math.random() * 5) + 1; //random number from 1-5
      let content = faker.commerce.productDescription();

      let newReview = { userId, businessId, rating, content };
      fakerReviewsArray.push(newReview);
    }
    return queryInterface.bulkInsert('Reviews', fakerReviewsArray);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Reviews', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
