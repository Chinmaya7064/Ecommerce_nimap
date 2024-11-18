const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  },
  { tableName: 'products' }
);

module.exports = Product;