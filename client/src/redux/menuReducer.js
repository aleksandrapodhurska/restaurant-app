import dataBase from "../ajax/ajax";
const GET_MENU = "GET_MENU";
const GET_CATEGORIES = "GET_CATEGORIES";
const TOGGLE_MENU_ITEM = "TOGGLE_MENU_ITEM";
const CLEAR_ACTIVE_MENU_ITEM = "CLEAR_ACTIVE_MENU_ITEM";

const initialState = {
	menu: [],
	activeMenuItem: [],
	categories: [],
};

const menuReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_MENU:
			return { ...state, menu: action.menu };
		case GET_CATEGORIES:
			return { ...state, categories: action.categories };
		case TOGGLE_MENU_ITEM:
			return {
				...state,
				activeMenuItem: [
					...(state.activeMenuItem.some(
						(item) => item._id === action.menuItem._id
					)
						? state.activeMenuItem.filter(
								(item) => item._id !== action.menuItem._id
						  )
						: [...state.activeMenuItem, action.menuItem]),
				],
			};
		case CLEAR_ACTIVE_MENU_ITEM:
			return {
				...state,
				activeMenuItem: [],
			};
		default:
			return state;
	}
};

export const getMenu = (menu) => ({ type: GET_MENU, menu });

export const getCategories = (categories) => ({
	type: GET_CATEGORIES,
	categories,
});
export const clearActiveMenuItem = () => ({ type: CLEAR_ACTIVE_MENU_ITEM });
export const toggleMenuItem = (menuItem) => ({
	type: TOGGLE_MENU_ITEM,
	menuItem,
});

export const getMenuThunkCreator = () => {
	return (dispatch) => {
		dataBase.getMenu().then((data) => {
			dispatch(getMenu(data));
		});
	};
};

export const getMenuByCategoryThunkCreator = (category) => {
	return (dispatch) => {
		dataBase.getByCategory(category).then((data) => {
			dispatch(getMenu(data));
		});
	};
};

export const getCategoriesThunkCreator = () => {
	return (dispatch) => {
		dataBase.getCategories().then((data) => {
			dispatch(getCategories(data));
		});
	};
};
export default menuReducer;
