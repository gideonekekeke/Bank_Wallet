import { createUser, loginUser } from "./../controllers/userController";
import express from "express";
const router = express.Router();
import {
	getUsers,
	singleUser,
	updateUser,
	removeUser,
} from "../controllers/userController";

router.route("/").get(getUsers);
router.route("/create").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").get(singleUser);
router.route("/update/:id").patch(updateUser);
router.route("/remove/:id").patch(removeUser);

export default router;
