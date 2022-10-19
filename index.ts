import express, { Response, Request, Application } from "express";
const port: number = 5000;
import mongoose from "mongoose";
const URL: string = "mongodb://localhost/AJwalletDB";
import user from "./Route/UserRouter";
import fol from "./Route/FollowRoute";
import wallet from "./Route/WalletRoute";

const app: Application = express();

mongoose
	.connect(URL)
	.then(() => {
		console.log("database is connected");
	})
	.catch((err) => {
		console.log("an error occurred: " + err);
	});

app.get("/", (req: Request, res: Response) => {
	res.status(200).json({ message: "we are ready" });
});

app.use(express.json());

app.use("/api/users", user);
app.use("/api/follow", fol);
app.use("/api/wallet", wallet);

app.listen(port, () => {
	console.log(`listening on ${port}`);
});