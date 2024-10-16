'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      News.hasMany(models.NewsDetail, { foreignKey: 'news_id' })
    }
  }
  News.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      content: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'News',
      tableName: 'news'
    }
  )
  return News
}
