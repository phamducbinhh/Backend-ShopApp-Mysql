'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class BannerDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      BannerDetail.belongsTo(models.Banner, { foreignKey: 'banner_id', as: 'banner' })
      BannerDetail.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' })
    }
  }
  BannerDetail.init(
    {
      product_id: DataTypes.INTEGER,
      banner_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'BannerDetail',
      tableName: 'banner_details'
    }
  )
  return BannerDetail
}
