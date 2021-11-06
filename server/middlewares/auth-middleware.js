const ApiError = require("../middlewares/error-middleware");
const tokenServise = require("../servise/token-servise");

module.exports = (req, res, next) => {
	try {
		const authorizationHeader = req.headers.authorization;
		console.log(authorizationHeader);
		if (!authorizationHeader) {
			return next(ApiError.NotauthorizedError());
		}
		const accessToken = authorizationHeader.split(" ")[1];
		if (!accessToken) {
			return next(ApiError.NotauthorizedError());
		}
		const userData = tokenServise.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.NotauthorizedError());
		}
		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.NotauthorizedError());
	}
};
