import { CategoryModel } from "../models/sequelize/category.model";

export const createCategory = async (req, res) => {
  const { name, description } = req.params;
  try {
    const newCategory = await CategoryModel.create({ name, description });
    return res.status(201).json({
      ok: true,
      msg: "Categoria creada correctamente",
      data: newCategory,
    });
    // TODO: crear category (solo admin)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryModel.find().populate("assets.categories");
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategories = await CategoryModel.findByIdAndDelete(id);
    return res.status(204).json({
      ok: true,
      msg: "Categoria eliminada correctamente",
      data: deletedCategories,
    });
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
