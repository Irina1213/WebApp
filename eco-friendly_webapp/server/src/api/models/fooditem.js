const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fooditem', {
    FoodItemID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'CategoryID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'UserID'
      }
    },
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    NotifyDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ImageSrc: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    IsExpired: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fooditem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "FoodItemID" },
        ]
      },
      {
        name: "CategoryID_idx",
        using: "BTREE",
        fields: [
          { name: "CategoryID" },
        ]
      },
      {
        name: "UserID_idx",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
