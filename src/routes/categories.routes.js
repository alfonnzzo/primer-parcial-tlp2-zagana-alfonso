import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categories.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

export const categoryRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// * crear una categoria (usuario autenticado que sea admin)
categoryRoutes.post("/categories", authMcreateCategory);

// * obtener todas las categorias (usuario autenticado)
categoryRoutes.get("/categories", getAllCategories);

// * eliminar una categoria por id (usuario autenticado que sea admin)
categoryRoutes.delete("/categories/:id", deleteCategory);
