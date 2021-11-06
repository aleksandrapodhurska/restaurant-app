const User = require("../models/user-model");
const uuid = require("uuid");
const mailServise = require("./mail-servise");
const tokenServise = require("./token-servise");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserServise {
	async reqistration(email, password) {
		const candidate = await User.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(
				`User with email ${email} is already exists`
			);
		}
		const hashedPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await User.create({
			email,
			password: hashedPassword,
			activationLink,
		});
		await mailServise.sendActivationLink(
			email,
			`${process.env.API_URL}/api/activate/${activationLink}`
		);
		const userDto = new UserDto(user);
		const tokens = await tokenServise.generateToken({ ...userDto });
		await tokenServise.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async activate(activationLink) {
		const user = await User.findOne({ activationLink });
		if (!user) {
			throw ApiError.BadRequest("Incorrect activation link");
		}
		user.isActive = true;
		await user.save();
	}

	async login(email, password) {
		const user = await User.findOne({ email });
		if (!user) {
			throw ApiError.BadRequest(`User ${email} is not registred`);
		}
		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest("Password incorrect");
		}
		const userDto = new UserDto(user);
		const tokens = await tokenServise.generateToken({ ...userDto });
		await tokenServise.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async logout(refreshToken) {
		const token = await tokenServise.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.NotauthorizedError();
		}
		const userData = tokenServise.validateRefreshToken(refreshToken);
		const tokenFromDB = await tokenServise.findToken(refreshToken);
		if (!userData || !tokenFromDB) {
			throw ApiError.NotauthorizedError();
		}
		const user = await User.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = await tokenServise.generateToken({ ...userDto });
		await tokenServise.saveToken(userDto.id, tokens.refreshToken);
		return { ...tokens, user: userDto };
	}

	async getUsers(req, res, next) {
		const users = await User.find();
		return users;
	}
}

module.exports = new UserServise();
