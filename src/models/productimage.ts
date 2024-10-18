'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' })
    }
  }
  ProductImage.init(
    {
      product_id: DataTypes.INTEGER,
      image_url: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'ProductImage',
      tableName: 'product_images'
    }
  )
  return ProductImage
}
