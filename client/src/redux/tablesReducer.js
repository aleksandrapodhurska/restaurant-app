import dataBase from "../ajax/ajax";
const GET_TABLES = "GET_TABLES";
const GET_SINGLE_TABLE = "GET_SINGLE_TABLE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const TOGGLE_SUBMENU = "TOGGLE_SUBMENU";
const CLOSE_SUBMENU = "CLOSE_SUBMENU";

const initialState = {
	tables: [],
	singleTable: null,
	isFetching: false,
	activeTable: null,
};

const tablesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TABLES:
			return { ...state, tables: action.tables };
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

export const getTables = (tables) => ({ type: GET_TABLES, tables });
export const getSingleTable = (table) => ({ type: GET_SINGLE_TABLE, table });
export const setFetching = (boolean) => ({ type: SET_IS_FETCHING, boolean });
export const toggleSubmenu = (table) => ({ type: TOGGLE_SUBMENU, table });
export const closeSubmenu = () => ({ type: CLOSE_SUBMENU });

export const getTablesThunkCreator = () => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.getTables().then((data) => {
			dispatch(setFetching(false));
			dispatch(getTables(data));
		});
	};
};

export const getSingleTableThunkCreator = (id) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.getSingleTable(id).then((data) => {
			dispatch(setFetching(false));
			dispatch(getSingleTable(data));
		});
	};
};

export const toggleOccupiedThunkCreator = (table) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.toggleOcupied(table).then((data) => {
			dataBase.getTables().then((data) => {
				dispatch(setFetching(false));
				dispatch(getTables(data));
			});
		});
	};
};

export default tablesReducer;

// case ADD_BILL_ITEM:
// 	let copyState = {
// 		...state,
// 		tablesCopy: [...state.tables],
// 	};
// 	let tableIndex = copyState.tablesCopy
// 		.find((item) => item.id === action.tableId)
// 		.bill.findIndex((item) => item.id === action.menuItem.id);
// 	if (tableIndex > -1) {
// 		copyState.tablesCopy
// 			.find((item) => item.id === action.tableId)
// 			.bill.find((item) => item.id === action.menuItem.id)
// 			.quantity++;
// 		copyState.tablesCopy
// 			.find((item) => item.id === action.tableId)
// 			.bill.find(
// 				(item) => item.id === action.menuItem.id
// 			).price += action.menuItem.price;
// 	} else {
// 		copyState.tablesCopy
// 			.find((item) => item.id === action.tableId)
// 			.bill.push(action.menuItem);
// 	}
// 	return copyState;
