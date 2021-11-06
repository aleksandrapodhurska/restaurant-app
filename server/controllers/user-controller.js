const userServise = require("../servise/user-servise");
require("dotenv").config();
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest(
						"Invalid email or password",
						errors.array()
					)
				);
			}
			const { email, password } = req.body;
			const userData = await userServise.reqistration(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userServise.login(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userServise.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}
	async activate(req, res, next) {
		try {
			await userServise.activate(req.params.link);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}
	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userServise.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			res.json(userData);
		} catch (e) {
			next(e);
		}
	}
	async getusers(req, res, next) {
		try {
			const users = await userServise.getUsers();
			return res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
