import { ProductModel } from "../models/ProductModel.js";
import {
  validProducts,
  validPartialProduct,
} from "../schemas/validProducts.js";
import multer from "multer";
import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import { capitalizeFirstLetter, generateSlug } from "../utils/fileUtils.js";
import { UserModel } from "../models/UserModel.js";

const imagesDir = path.join("", "./products_images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagesDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

export const upload = multer({ storage });

export class ProductController {
  static async getAll(req, res) {
    const products = await ProductModel.getAll();
    res.json({ productos: products });
  }

  static async create(req, res) {
    try {
      const { userId, userEmail } = req.query;

      if (!userId || !userEmail) {
        if (req.file) await fs.unlink(req.file.path);
        return res.status(400).json({ message: "Faltan datos para validar." });
      }

      const usuario = await UserModel.getById(userId, userEmail);
      if (
        !usuario ||
        usuario.email.toLowerCase() !== userEmail.toLowerCase() ||
        !usuario.admin
      ) {
        if (req.file) await fs.unlink(req.file.path);
        return res
          .status(403)
          .json({ message: "No está autorizado para esta acción" });
      }

      if (!req.file)
        return res.status(400).json({ error: "Debes subir una imagen" });

      if (req.body.price) req.body.price = Number(req.body.price);

      req.body.productDestacado =
        req.body.productDestacado === "true" ||
        req.body.productDestacado === true;
      req.body.inCarousel =
        req.body.inCarousel === "true" || req.body.inCarousel === true;

      const result = validProducts(req.body);
      if (!result.success)
        return res.status(400).json({ error: result.error.issues[0].message });

      const { name, price, description, productDestacado, inCarousel } =
        result.data;

      const nameRepeat = await ProductModel.getAll().then((prods) =>
        prods.find((p) => p.name.toLowerCase() === name.toLowerCase())
      );
      if (nameRepeat) throw new Error("Ya existe un producto con ese nombre");

      const uniqueName = Date.now() + path.extname(req.file.originalname);
      const finalPath = path.join(imagesDir, uniqueName);

      await fs.rename(req.file.path, finalPath);

      const newProduct = await ProductModel.create({
        input: {
          name,
          price,
          description: capitalizeFirstLetter(description),
          productDestacado,
          inCarousel,
          slug: generateSlug(name),
        },
        imageURL: `${req.protocol}://${req.get(
          "host"
        )}/products_images/${uniqueName}`,
      });

      res.status(201).json({
        message: "Producto agregado correctamente",
        product: newProduct,
      });
    } catch (err) {
      console.error(err);
      if (req.file && fsSync.existsSync(req.file.path))
        await fs.unlink(req.file.path);
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const { userId, userEmail } = req.query;

      if (!userId || !userEmail) {
        return res.status(400).json({ message: "Faltan datos de usuario." });
      }

      const usuario = await UserModel.getById(userId, userEmail);
      if (
        !usuario ||
        usuario.email.toLowerCase() !== userEmail.toLowerCase() ||
        !usuario.admin
      ) {
        if (req.file) await fs.unlink(req.file.path);
        return res
          .status(403)
          .json({ message: "No está autorizado para esta acción" });
      }

      const success = await ProductModel.delete({ id });

      if (!success) {
        return res
          .status(404)
          .json({ message: "Producto no encontrado o no coincide con el ID" });
      }

      res.json({ message: "Producto e imagen eliminados correctamente" });
    } catch (err) {
      console.error("Error al eliminar el producto o la imagen:", err);
      res
        .status(500)
        .json({ message: "Error al eliminar el producto o la imagen" });
    }
  }

  static async toggleCarousel(req, res) {
    try {
      const { userId, userEmail, productId } = req.query;

      if (!userId || !userEmail || !productId) {
        return res.status(400).json({ message: "Faltan datos para validar." });
      }

      const usuario = await UserModel.getById(userId, userEmail);
      if (
        !usuario ||
        usuario.email.toLowerCase() !== userEmail.toLowerCase() ||
        !usuario.admin
      ) {
        if (req.file) await fs.unlink(req.file.path);
        return res
          .status(403)
          .json({ message: "No está autorizado para esta acción" });
      }

      const result = validPartialProduct(req.body);
      if (!result.success) {
        const firstErrorMessage =
          result.error?.issues?.[0]?.message || "Error de validación";
        return res.status(400).json({ error: firstErrorMessage });
      }

      const { inCarousel } = result.data;

      const updatedProduct = await ProductModel.update({
        id: productId,
        input: { inCarousel },
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.json({ message: "Cambios aplicados", product: updatedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  static async toggleDestacado(req, res) {
    try {
      const { userId, userEmail, productId } = req.query;

      if (!userId || !userEmail || !productId) {
        return res.status(400).json({ message: "Faltan datos para validar." });
      }

      const usuario = await UserModel.getById(userId, userEmail);
      if (
        !usuario ||
        usuario.email.toLowerCase() !== userEmail.toLowerCase() ||
        !usuario.admin
      ) {
        if (req.file) await fs.unlink(req.file.path);
        return res
          .status(403)
          .json({ message: "No está autorizado para esta acción" });
      }

      const result = validPartialProduct(req.body);
      if (!result.success) {
        const firstErrorMessage =
          result.error?.issues?.[0]?.message || "Error de validación";
        return res.status(400).json({ error: firstErrorMessage });
      }

      const { productDestacado } = result.data;

      const updatedProduct = await ProductModel.update({
        id: productId,
        input: { productDestacado },
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      res.json({ message: "Cambios aplicados", product: updatedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
