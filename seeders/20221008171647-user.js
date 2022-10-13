'use strict'; 
module.exports = { 
  up: async (queryInterface, Sequelize) => { 
    await queryInterface.bulkInsert('Users', [
      { 
        userName: "ann",
        firstName: 'Annie', 
        lastName: 'Easley',
        password: "$2b$10$Pd5zdcrRFRItGDJqKZmg2up9CXcW4cXlozYXHbOBsvRVm9ft4080C", 
        email: 'ajeasley@nasa.gov', 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
    ], {}); }, 
    down: async (queryInterface, Sequelize) => { 
      return queryInterface.bulkDelete('Users', null, {}); } }; 