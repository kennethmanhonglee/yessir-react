'use strict';
module.exports = (sequelize, DataTypes) => {
  const Businesses = sequelize.define('Businesses', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {});
  Businesses.associate = function (models) {
    // associations can be defined here
    Businesses.belongsTo(models.User, { foreignKey: ownerId });
  };
  return Businesses;
};