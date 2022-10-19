import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/UserModel";
import { Response, Request } from "express";
import cypto from "crypto";

export const getUsers = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const alUsers = await userModel
			.find({})
			.sort({
				createdAt: -1,
			})
			.populate("wallet");
		return res.status(200).json({
			message: "successfull",
			data: alUsers,
		});
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};

export const singleUser = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const findUser = await userModel.findById(req.params.id);
		return res.status(200).json({
			message: "successfull",
			data: findUser,
		});
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};
export const updateUser = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { userName, fullName } = req.body;
		const findUser = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				userName,
				fullName,
			},
			{ new: true },
		);
		return res.status(200).json({
			message: "successfull",
			data: findUser,
		});
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};
export const removeUser = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const findUser = await userModel.findByIdAndRemove(req.params.id);
		return res.status(200).json({
			message: "successfull",
			data: findUser,
		});
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};
export const createUser = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { userName, fullName, email, password } = req.body;
		const numb = Math.floor(1000 + Math.random() * 9000);

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const User = await userModel.create({
			userName,
			fullName,
			email,
			password: hash,
			accesstoken: numb,
		});
		return res.status(200).json({
			message: "successfull",
			data: User,
		});
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};

export const loginUser = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	try {
		const { email, password } = req.body;
		const findUser = await userModel.findOne({ email });

		if (findUser) {
			const checkPassword = await bcrypt.compare(password, findUser.password);

			if (checkPassword) {
				const { ...info } = findUser._doc;

				return res
					.status(200)
					.json({ message: `Welcome back ${findUser.userName}`, data: info });
			} else {
				return res.status(404).json("password is incorrect");
			}
		} else {
			return res.status(404).json("user with this email does not exists");
		}
	} catch (err) {
		return res.status(404).json({ message: err.message });
	}
};
