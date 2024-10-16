'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize: any, DataTypes: any) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Banner.hasMany(models.BannerDetail, { foreignKey: 'banner_id' })
    }
  }
  Banner.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      status: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Banner',
      tableName: 'banner'
    }
  )
  return Banner
}
