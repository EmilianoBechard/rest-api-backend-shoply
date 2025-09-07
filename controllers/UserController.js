import { UserModel } from "../models/UserModel.js";
import {
  validUsers,
  validPartialUser,
  validPartialActualization,
  validFullActualization,
} from "../schemas/validUsers.js";

export class UserController {
  static async validate(req, res) {
    const { id, email } = req.query;
    if (!id || !email)
      return res.status(400).json({ message: "Faltan datos para validar." });

    const user = await UserModel.getById(id, email);
    if (user) {
      return res.status(200).json({ message: "Usuario válido." });
    }
    return res.status(400).json({ message: "Usuario no encontrado" });
  }
  static async validateAdmin(req, res) {
    const { id, email } = req.query;
    if (!id || !email)
      return res.status(400).json({ message: "Faltan datos para validar." });

    const user = await UserModel.getById(id, email);
    if (user) {
      return res.status(200).json({ admin: user.admin === true });
    }
    return res.status(200).json({ admin: false });
  }

  static async get(req, res) {
    const { email, password } = req.query;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Faltan datos para iniciar sesión." });
    }

    const result = validPartialUser({ email, password });
    if (!result.success) {
      const firstError =
        result.error?.issues?.[0]?.message || "Datos inválidos";
      return res.status(400).json({ message: firstError });
    }
    const user = await UserModel.getAll();
    const usuario = user.find(
      (u) =>
        u.password === password && u.email.toLowerCase() === email.toLowerCase()
    );

    if (usuario) {
      return res
        .status(200)
        .json({ id: usuario.id, email: usuario.email, name: usuario.name });
    }
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  static async create(req, res) {
    const result = validUsers(req.body);
    if (!result.success) {
      const firstErrorMessage =
        result.error?.issues?.[0]?.message || "Error de validación";
      return res.status(400).json({ error: firstErrorMessage });
    }

    const { name, email, password } = result.data;

    if (await UserModel.getByEmail(email)) {
      return res.status(400).json({ message: "El email ya esta registrado" });
    }
    const newUser = await UserModel.create({ name, email, password });
    res
      .status(201)
      .json({ id: newUser.id, name: newUser.name, email: newUser.email });
  }

  static async update(req, res) {
    const result = validPartialActualization(req.body);
    if (!result.success) {
      const firstErrorMessage =
        result.error?.issues?.[0]?.message || "Error de validación";
      return res.status(400).json({ error: firstErrorMessage });
    }

    const { id } = req.params;
    const input = result.data;

    try {
      const updatedUser = await UserModel.update({ id, input });
      if (!updatedUser) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
      return res.json({ message: "Cambios aplicados", user: updatedUser });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async fullUpdate(req, res) {
    const { id } = req.params;

    const result = validFullActualization(req.body);
    if (!result.success) {
      const firstErrorMessage =
        result.error?.issues?.[0]?.message || "Error de validación";
      return res.status(400).json({ error: firstErrorMessage });
    }

    try {
      const updatedUser = await UserModel.update({ id, input: result.data });
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json({
        message: "Cambios aplicados con PUT",
        user: updatedUser,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    // Validamos solo el email
    const result = validPartialUser(req.body);
    if (!result.success) {
      const firstErrorMessage =
        result.error?.issues?.[0]?.message || "Error de validación";
      return res.status(400).json({ error: firstErrorMessage });
    }

    const { email } = result.data;
    const { id } = req.params;

    if (email.toLowerCase() === "administrador123@hotmail.com") {
      return res
        .status(403)
        .json({ message: "No se puede eliminar al usuario administrador" });
    }

    try {
      const deleted = await UserModel.delete({ id, email });
      if (!deleted) {
        return res.status(400).json({
          message: "Usuario no encontrado o email no coincide con el ID",
        });
      }

      return res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
