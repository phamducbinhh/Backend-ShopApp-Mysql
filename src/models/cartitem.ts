'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' })
      CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' })
    }
  }
  CartItem.init(
    {
      product_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'CartItem',
      tableName: 'carts_items'
    }
  )
  return CartItem
}
