import mongoose from "mongoose";

interface User {
	sentTo: string;
	recieviedForm: string;
	amount: number;
	transactionDescription: string;
	wallet: {};
}

interface SchemaData extends User, mongoose.Document {}

const historyModel = new mongoose.Schema(
	{
		wallet: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "wallets",
		},
		sentTo: {
			type: String,
		},
		recieviedForm: {
			type: String,
		},
		transactionDescription: {
			type: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<SchemaData>("histories", historyModel);
