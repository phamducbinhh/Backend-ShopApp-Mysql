'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  });
  return Category;
};