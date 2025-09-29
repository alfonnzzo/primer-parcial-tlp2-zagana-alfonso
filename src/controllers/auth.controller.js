import { signToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";
import { hashPassword } from "../utils/crypto.util.js";
import { comparePassword } from "../utils/crypto.util.js";
import { signToken } from "../utils/jwt.util.js";

export const register = async (req, res) => {
  const { username, email, password, profile } = req.body;
  const hashed = await hashPassword(password);
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password: hashed,
      role,
      profile,
    });
    return res.status(201).json({
      ok: true,
      msg: "Usuario y perfil creados correctamente",
      data: newUser,
    });
    // TODO: crear usuario con password hasheada y profile embebido
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "Credenciales invalidas" });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = signToken({
      id: user.id,
      username: user.username,
      role: user.role,
      profile: user.profile  
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ msg: "Login exitoso" });

    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await UserModel.findById(req.user.id).populate("profile");
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
