import { UserModel } from "../models/UserModel.js";

export async function checkAdmin(req, res, next) {
  const { userId, userEmail } = req.query;
  if (!userId || !userEmail)
    return res.status(400).json({ message: "Faltan datos para validar." });

  const user = await UserModel.getById(userId, userEmail);
  if (
    !user ||
    user.email.toLowerCase() !== userEmail.toLowerCase() ||
    !user.admin
  ) {
    return res
      .status(403)
      .json({ message: "No está autorizado para esta acción" });
  }

  next();
}
