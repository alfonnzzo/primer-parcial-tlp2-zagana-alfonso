import { DataTypes } from "sequelize";
import { CategoryModel } from "./category.model";
import { AssetModel } from "./asset.model";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

AssetModel.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  foreignKey: "asset_id",
  otherKey: "category_id",
  as: "categories",
  onDelete: "CASCADE",
});
CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  foreignKey: "category_id",
  otherKey: "asset_id",
  as: "assets",
  onDelete: "CASCADE",
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
