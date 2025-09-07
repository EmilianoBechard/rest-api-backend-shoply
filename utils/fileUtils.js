import {
  validPartialUser,
  validUsers,
  validPartialActualization,
  validFullActualization,
} from "../schemas/validUsers.js";
import {
  validPartialProduct,
  validProducts,
} from "../schemas/validProducts.js";

// Validaciones de usuarios

export function validateNewUser(data) {
  const result = validUsers(data);
  if (!result.success) {
    const firstErrorMessage =
      result.error?.issues?.[0]?.message || "Error de validación";
    throw new Error(firstErrorMessage);
  }
  return result.data;
}

export function validatePartialUser(data) {
  const result = validPartialUser(data);
  if (!result.success) {
    const firstErrorMessage =
      result.error?.issues?.[0]?.message || "Error de validación";
    throw new Error(firstErrorMessage);
  }
  return result.data;
}

export function validatePartialUserUpdate(data) {
  const result = validPartialActualization(data);
  if (!result.success) {
    const firstErrorMessage =
      result.error?.issues?.[0]?.message || "Error de validación";
    throw new Error(firstErrorMessage);
  }
  return result.data;
}

export function validateFullUserUpdate(data) {
  const result = validFullActualization(data);
  if (!result.success) {
    const firstErrorMessage =
      result.error?.issues?.[0]?.message || "Error de validación";
    throw new Error(firstErrorMessage);
  }
  return result.data;
}

// Validaciones de productos

export function validateNewProduct(data) {
  const result = validProducts(data);
  if (!result.success) {
    const firstErrorMessage =
      result.error?.issues?.[0]?.message || "Error de validación";
    throw new Error(firstErrorMessage);
  }
  return result.data;
}

export function validatePartialProductData(data) {
  const result = validPartialProduct(data);
  if (!result.success) {
    const firstErrorMessage =
      result.error?.issues?.[0]?.message || "Error de validación";
    throw new Error(firstErrorMessage);
  }
  return result.data;
}

// Utilidades varias

export function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseBoolean(value) {
  return value === "true" || value === true;
}
