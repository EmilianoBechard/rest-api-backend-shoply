import { Router } from "express";
import { UserController } from "../controllers/UserController.js";

export const usersRouter = Router();

usersRouter.get("/validar", UserController.validate);
usersRouter.get("/admin", UserController.validateAdmin);
usersRouter.get("/", UserController.get);
usersRouter.post("/", UserController.create);
usersRouter.patch("/:id", UserController.update);
usersRouter.put("/:id", UserController.fullUpdate);
usersRouter.delete("/:id", UserController.delete);
