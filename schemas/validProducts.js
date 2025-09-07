import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, "../productos.json");

let productsData = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
let products = productsData.productos || [];

export const validProduct = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "El precio debe ser mayor a 0")
  ),
  description: z
    .string()
    .max(300, "La descripcion no puede superar los 300 caracteres")
    .optional(),
  productDestacado: z.boolean(),
  inCarousel: z.boolean(),
});

export function validProducts(object) {
  return validProduct.safeParse(object);
}

export function validPartialProduct(object) {
  return validProduct.partial().safeParse(object);
}

export const getNextProductId = (productsArray) => {
  let maxId = 0;
  productsArray.forEach((el) => {
    const idNumber = parseInt(el.id);
    if (!isNaN(idNumber) && idNumber > maxId) maxId = idNumber;
  });
  return String(maxId + 1);
};
