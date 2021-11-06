import dataBase from "../ajax/ajax";
const GET_TABLES = "GET_TABLES";
const GET_SINGLE_TABLE = "GET_SINGLE_TABLE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const TOGGLE_SUBMENU = "TOGGLE_SUBMENU";
const CLOSE_SUBMENU = "CLOSE_SUBMENU";
const CLEAR_TABLES = "CLEAR_TABLES";

const initialState = {
	tables: [],
	singleTable: null,
	isFetching: false,
	activeTable: null,
};

const tablesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TABLES:
			return {
				...state,
				tables: action.tables,
			};
		case CLEAR_TABLES:
			return {
				...state,
				tables: [],
				singleTable: null,
			};
		case TOGGLE_SUBMENU:
			return {
				...state,
				activeTable: state.activeTable ? null : action.table,
			};
		case CLOSE_SUBMENU:
			return {
				...state,
				activeTable: null,
			};
		case GET_SINGLE_TABLE:
			return {
				...state,
				singleTable: action.table,
			};
		case SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.boolean,
			};
		default:
			return state;
	}
};

export const getTables = (tables) => ({
	type: GET_TABLES,
	tables,
});
export const getSingleTable = (table) => ({
	type: GET_SINGLE_TABLE,
	table,
});
export const setFetching = (boolean) => ({
	type: SET_IS_FETCHING,
	boolean,
});
export const toggleSubmenu = (table) => ({
	type: TOGGLE_SUBMENU,
	table,
});
export const closeSubmenu = () => ({
	type: CLOSE_SUBMENU,
});
export const clearTables = () => ({
	type: CLEAR_TABLES,
});

export const getTablesThunkCreator = () => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.getTables().then((data) => {
			dispatch(getTables(data));
			dispatch(setFetching(false));
		});
	};
};

export const getSingleTableThunkCreator = (id) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.getSingleTable(id).then((data) => {
			dispatch(getSingleTable(data));
			dispatch(setFetching(false));
		});
	};
};

export const toggleOccupiedThunkCreator = (table) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.toggleOcupied(table).then(() => {
			dataBase.getTables().then((data) => {
				dispatch(getTables(data));
				dispatch(setFetching(false));
			});
		});
	};
};

export default tablesReducer;
