import express from "express";
const router = express.Router();
import {
	createWallet,
	getWallet,
	createWalletTransaction,
} from "../controllers/WalletController";

router.route("/:id/create").post(createWallet);
router.route("/:id").get(getWallet);
router.route("/:myID/:recieverID/send").patch(createWalletTransaction);
export default router;
