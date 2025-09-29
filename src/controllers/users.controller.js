import { UserModel } from "../models/mongoose/user.model.js";

export const getAllUsers = async (_req, res) => {
  try {
    const users = await UserModel.find()
    .populate("profile")
    .populate("assets.categories");
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(204).json({ msg: "Usuario eliminado correctamente" });}
    // TODO: eliminación lógica (deletedAt) (solo admin)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
