import dataBase from "../ajax/ajax";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SIGN_UP_STATUS = "SIGN_UP_STATUS";

const initialState = {
	isFetching: false,
	isAuth: false,
	user: {},
	token: "",
	signUpStatus: {
		hasSignedUp: false,
		message: "",
	},
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isAuth: true,
				user: action.data.user,
				token: action.data.accessToken,
			};
		case LOG_OUT:
			localStorage.removeItem("token");
			return {
				...state,
				isAuth: false,
				user: {},
			};
		case SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.boolean,
			};
		case SIGN_UP_STATUS:
			return {
				...state,
				signUpStatus: {
					hasSignedUp: action.data.hasSignedUp,
					message: action.data.message,
				},
			};
		default:
			return state;
	}
};

export const login = (data) => ({ type: LOG_IN, data });
export const logout = () => ({ type: LOG_OUT });
export const setFetching = (boolean) => ({ type: SET_IS_FETCHING, boolean });
export const setSignUpStatus = (data) => ({ type: SIGN_UP_STATUS, data });

export const signUpThunkCreator = (candidate) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.signUp(candidate).then((data) => {
			dispatch(setSignUpStatus(data));
			dispatch(setFetching(false));
		});
	};
};

export const logInThunkCreator = (logInData) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.logIn(logInData).then((data) => {
			localStorage.token = data.accessToken;
			dispatch(login(data));
			dispatch(setFetching(false));
		});
	};
};

export const checkAuthThunkCreator = () => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.checkAuth().then((data) => {
			dispatch(login(data));
			dispatch(setFetching(false));
		});
	};
};

export default authReducer;
