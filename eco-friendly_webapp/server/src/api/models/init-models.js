var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _fooditem = require("./fooditem");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var fooditem = _fooditem(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  fooditem.belongsTo(category, { as: "Category", foreignKey: "CategoryID"});
  category.hasMany(fooditem, { as: "fooditems", foreignKey: "CategoryID"});
  fooditem.belongsTo(user, { as: "User", foreignKey: "UserID"});
  user.hasMany(fooditem, { as: "fooditems", foreignKey: "UserID"});

  return {
    category,
    fooditem,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
