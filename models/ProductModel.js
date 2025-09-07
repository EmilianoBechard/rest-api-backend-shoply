import fs from "fs/promises";
import { getNextProductId } from "../schemas/validProducts.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.join(__dirname, "..", "productos.json");

const imagesDir = path.join("", "./products_images");

let products =
  JSON.parse(await fs.readFile(productsFilePath, "utf-8")).productos || [];

// Guardar productos
async function saveProducts() {
  await fs.writeFile(
    productsFilePath,
    JSON.stringify({ productos: products }, null, 2)
  );
}

export class ProductModel {
  static async getAll() {
    return products;
  }

  static async getById(id) {
    return products.find((p) => String(p.id) === String(id));
  }

  static async create({ input, imageURL }) {
    const newProduct = { id: getNextProductId(products), ...input, imageURL };
    products.push(newProduct);
    await saveProducts();
    return newProduct;
  }

  static async update({ id, input }) {
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) return false;
    products[index] = { ...products[index], ...input };
    await saveProducts();
    return products[index];
  }

  static async delete({ id }) {
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) return false;

    const imageURL = products[index].imageURL;
    if (imageURL) {
      const imagePath = path.join(imagesDir, path.basename(imageURL));

      try {
        await fs.access(imagePath);
        await fs.unlink(imagePath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.error("Error borrando la imagen:", err);
        }
      }
    }

    products.splice(index, 1);
    await saveProducts();
    return true;
  }
}
