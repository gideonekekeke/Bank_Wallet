import UserModel from "../Models/UserModel";
import HistoryMode from "../Models/HistoryMode";
import WalletModel from "../Models/WalletModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const createHistory = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const user = await WalletModel.findById(req.params.id);
		const myWallet = await WalletModel.findById(req.params.myID);
		const yourWallet = await WalletModel.findById(req.params.recieverID);

		const firstTrans = await HistoryMode.create({
			sentTo: req.params.recieverID,
			recieviedForm: req.params.myID,
			transactionDescription: myWallet?.paymentDescription,
		});
		myWallet?.history.push(new mongoose.Types.ObjectId(firstTrans._id));
		myWallet?.save();

		const secondTrans = await HistoryMode.create({
			sentTo: req.params.recieverID,
			recieviedForm: req.params.myID,
			transactionDescription: myWallet?.paymentDescription,
		});

		yourWallet?.history.push(new mongoose.Types.ObjectId(secondTrans._id));
		yourWallet?.save();

		return res.status(200).json({
			message: "transaction created successfully",
		});
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};

// export const createHistoryTransaction = (req : Request, res : Response):Promise<Response>=>{

// try{

//   const myWallet =  await WalletModel.findById(req.params.myID)
//   const yourWallet =  await WalletModel.findById(req.params.recieverID)

//     return res.status(200).json({message : "Data got" })

// }catch(err){
//     return res.status(404).json({message : "an error occurred while creating"})
// }

// }
