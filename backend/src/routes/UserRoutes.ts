import { Router } from "express";
import UsersController from "../controllers/usersController";

const router = Router();

router.post("/", UsersController.createUser);  // Cria um usuário
router.get("/", UsersController.getAllUsers);  // Pega todos os usuários
router.get("/:id", UsersController.getUserById);  // Pega um usuário pelo ID
router.put("/:id", UsersController.updateUser);  // Atualiza um usuário pelo ID
router.delete("/:id", UsersController.deleteUser);  // Deleta um usuário pelo ID

export default router;
