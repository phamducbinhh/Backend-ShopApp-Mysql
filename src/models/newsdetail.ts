'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class NewsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      NewsDetail.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' })
      NewsDetail.belongsTo(models.News, { foreignKey: 'news_id', as: 'news' })
    }
  }
  NewsDetail.init(
    {
      product_id: DataTypes.INTEGER,
      news_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'NewsDetail',
      tableName: 'news_details'
    }
  )
  return NewsDetail
}
