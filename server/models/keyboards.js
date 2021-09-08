'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keyboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Keyboard.belongsToMany(models.User, {
        through: 'Likes',
      });
      models.Keyboard.hasMany(models.Review, {
        foreignKey: 'keyboardId',
        sourceKey: 'id',
        onDelete: 'cascade',
      });
    }
  }
  Keyboard.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      switch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sound: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noise: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gaming: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image4: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image5: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Keyboard',
      tableName: 'Keyboards',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  return Keyboard;
};
