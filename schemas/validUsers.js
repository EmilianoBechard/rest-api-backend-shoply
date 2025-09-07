import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../usuarios.json");

let usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
let users = usersData.usuarios || [];

export const validUser = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .regex(/^[^0-9]*$/, "El nombre no puede contener números"),
  email: z.email("El email no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const userActualization = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .regex(/^[^0-9]*$/, "El nombre no puede contener números")
    .optional(),
  email: z.email("El email no es válido").optional(),
  emailActual: z.email("El email no es válido").optional(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .optional(),
  passwordActual: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .optional(),
});

export const userFullActualization = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),

  email: z.email("El email no es válido"),
  emailActual: z.email("El email no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  passwordActual: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export function validFullActualization(object) {
  return userFullActualization.safeParse(object);
}

export function validPartialFullActualization(object) {
  return userFullActualization.partial().safeParse(object);
}

export function validActualization(object) {
  return userActualization.safeParse(object);
}

export function validPartialActualization(object) {
  return userActualization.partial().safeParse(object);
}

export function validUsers(object) {
  return validUser.safeParse(object);
}

export function validPartialUser(object) {
  return validUser.partial().safeParse(object);
}

export const getNextId = (usersArray) => {
  let maxId = 0;
  usersArray.forEach((el) => {
    const idNumber = parseInt(el.id);
    if (!isNaN(idNumber) && idNumber > maxId) maxId = idNumber;
  });
  return String(maxId + 1);
};
