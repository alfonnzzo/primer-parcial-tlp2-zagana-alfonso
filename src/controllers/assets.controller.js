import { AssetModel } from "../models/mongoose/asset.model.js";

export const createAsset = async (req, res) => {
  
    try {
        const newAsset = new AssetModel(req.body);
        await newAsset.save();
        return res.status(201).json({
            ok: true,
            msg: "Asset creado correctamente",
            data: newAsset,
        })
    // TODO: crear asset (usuario autenticado)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
    try {
        const getAssets = await AssetModel.find().populate("status").populate("categories");
        return res.status(200).json(getAssets);
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Usuario no autenticado" });
    }
    const myAssets = await AssetModel.find({ user: req.user.id }).populate(
      "status",
      "categories"
    );
    return res.status(200).json({
      msg: "Assets del usuario",
      count: myAssets.length,
      assets: myAssets,
    });
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
    console.log(req.params.id)
    try {
        const deleteAsset = await AssetModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            ok: true,
            msg: "Assets eliminado correctamente",
            data: deleteAsset
        })
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
