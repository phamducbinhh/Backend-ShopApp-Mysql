'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.INTEGER
      },
      oldprice: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      specification: {
        type: Sequelize.TEXT
      },
      buyturn: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands', // tên bảng tham chiếu
          key: 'id',      // khóa chính của bảng tham chiếu
        },
        onUpdate: 'CASCADE', // Cập nhật khi giá trị khóa chính thay đổi
        onDelete: 'SET NULL', // Đặt null nếu bản ghi người dùng bị xóa
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // tên bảng tham chiếu
          key: 'id',      // khóa chính của bảng tham chiếu
        },
        onUpdate: 'CASCADE', // Cập nhật khi giá trị khóa chính thay đổi
        onDelete: 'SET NULL', // Đặt null nếu bản ghi người dùng bị xóa
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};