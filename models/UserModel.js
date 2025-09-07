import fs from "fs/promises";
import { getNextId } from "../schemas/validUsers.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "..", "usuarios.json");

let usersData = await fs.readFile(usersFilePath, "utf-8");
usersData = JSON.parse(usersData);
let users = usersData.usuarios || [];

async function saveUsers() {
  try {
    await fs.writeFile(
      usersFilePath,
      JSON.stringify({ usuarios: users }, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error("Error al guardar usuarios:", err);
  }
}

export class UserModel {
  static async getAll() {
    return users;
  }
  static async getById(id, email) {
    const usuario = users.find(
      (usuario) =>
        usuario.id === id && usuario.email.toLowerCase() === email.toLowerCase()
    );
    return usuario;
  }

  static async getByEmail(email) {
    const emailExistente = users.some(
      (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
    );
    return emailExistente;
  }

  static async create({ name, email, password }) {
    const newUser = { id: getNextId(users), name, email, password };
    users.push(newUser);
    await saveUsers();
    return newUser;
  }

  static async update({ id, input }) {
    const index = users.findIndex((u) => String(u.id) === String(id));
    if (index === -1) return false;

    const usuarioEncontrado = users[index];

    const { emailActual, passwordActual, email, password, name } = input;

    if (name && name.trim() === usuarioEncontrado.name) {
      throw new Error("El nombre nuevo no puede ser igual al actual");
    }

    if (passwordActual && usuarioEncontrado.password !== passwordActual) {
      throw new Error("La contraseña actual es incorrecta");
    }

    if (
      emailActual &&
      usuarioEncontrado.email.toLowerCase() !== emailActual.toLowerCase()
    ) {
      throw new Error("El email actual no coincide");
    }

    if (password && password === usuarioEncontrado.password) {
      throw new Error("La contraseña nueva no puede ser igual a la actual");
    }

    if (email) {
      if (email.toLowerCase() === usuarioEncontrado.email.toLowerCase()) {
        throw new Error("El email nuevo no puede ser igual al actual");
      }

      const emailUsado = users.some(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.id !== usuarioEncontrado.id
      );
      if (emailUsado) {
        throw new Error("El email ya está registrado por otro usuario");
      }
    }
    users[index] = {
      ...usuarioEncontrado,
      name: name ?? usuarioEncontrado.name,
      email: email ?? usuarioEncontrado.email,
      password: password ?? usuarioEncontrado.password,
    };

    await saveUsers();
    return users[index];
  }

  static async delete({ id, email }) {
    const index = users.findIndex(
      (u) =>
        String(u.id) === String(id) &&
        u.email.toLowerCase() === email.toLowerCase()
    );
    if (index === -1) return false;

    users.splice(index, 1);
    await saveUsers();
    return true;
  }
}
