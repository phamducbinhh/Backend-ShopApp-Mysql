'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Brand.hasMany(models.Product, { foreignKey: 'brand_id' })
    }
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Brand',
      tableName: 'brands'
    }
  )
  return Brand
}
