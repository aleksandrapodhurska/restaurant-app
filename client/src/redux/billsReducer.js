import dataBase from "../ajax/ajax";
const SET_CURRENT_BILL = "SET_CURRENT_BILL";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const OPEN_BILL = "OPEN_BILL";
const SET_BILL_ITEMS = "SET_BILL_ITEMS";
const CLEAR_BILL_ITEMS = "CLEAR_BILL_ITEMS";
const ADD_ITEM_TO_BILL = "ADD_ITEM_TO_BILL";
const UPDATE_ITEM_IN_BILL = "UPDATE_ITEM_IN_BILL";
const DELETE_ITEM_IN_BILL = "DELETE_ITEM_IN_BILL";
const CONFIRM_ORDER = "CONFIRM_ORDER";

const initialState = {
	currentBill: null,
	billItems: [],
	isFetching: false,
};

const billsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_BILL:
			return {
				...state,
				currentBill: action.bill,
			};
		case SET_BILL_ITEMS:
			return {
				...state,
				billItems: action.items,
			};
		case CLEAR_BILL_ITEMS:
			return {
				...state,
				currentBill: null,
				billItems: [],
			};
		case SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.boolean,
			};
		case OPEN_BILL:
			return {
				...state,
				currentBill: [action.bill],
			};
		case ADD_ITEM_TO_BILL:
			return {
				...state,
				currentBill: { ...state.currentBill, isConfirmed: false },
				billItems: state.billItems.some(
					(item) => item._id === action.item._id
				)
					? [
							...state.billItems.map((item) => {
								if (item._id === action.item._id) {
									item.quantity += +action.item.quantity;
									item.total = +(
										item.total + +action.item.total
									).toFixed(2);
									return item;
								} else {
									return item;
								}
							}),
					  ]
					: [...state.billItems, action.item],
			};
		case UPDATE_ITEM_IN_BILL:
			return {
				...state,
				currentBill: { ...state.currentBill, isConfirmed: false },
				billItems: state.billItems.map((item) =>
					item._id === action.item._id ? action.item : item
				),
			};
		case DELETE_ITEM_IN_BILL:
			return {
				...state,
				currentBill: { ...state.currentBill, isConfirmed: false },
				billItems: state.billItems.filter(
					(item) => item._id !== action.id
				),
			};
		case CONFIRM_ORDER:
			return {
				...state,
			};
		default:
			return state;
	}
};
export const setFetching = (boolean) => ({ type: SET_IS_FETCHING, boolean });
export const setCurrentBill = (bill) => ({ type: SET_CURRENT_BILL, bill });
export const setBillItems = (items) => ({ type: SET_BILL_ITEMS, items });
export const clearBillItems = () => ({ type: CLEAR_BILL_ITEMS });

export const openBill = (bill) => ({
	type: OPEN_BILL,
	bill,
});
export const addItemToBill = (item) => ({
	type: ADD_ITEM_TO_BILL,
	item,
});
export const updateItemInBill = (item) => ({
	type: UPDATE_ITEM_IN_BILL,
	item,
});
export const deleteItemInBill = (id) => ({
	type: DELETE_ITEM_IN_BILL,
	id,
});

export const setCurrentBillThunkCreator = (tableId) => {
	return (dispatch) => {
		dispatch(clearBillItems());
		dispatch(setFetching(true));
		dataBase.getBill(tableId).then((data) => {
			dispatch(setCurrentBill(data));
			dispatch(setBillItems(data.items));
		});
		dispatch(setFetching(false));
	};
};

export const openBillItemThunkCreator = (tableId, menuItem) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.openBill(tableId, menuItem).then((data) => {
			dispatch(openBill(data));
			dispatch(setBillItems(data.items));
		});
		dispatch(setFetching(false));
	};
};

export const confirmOrderThunkCreator = (tableId, order) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.confirmOrder(tableId, order).then((data) => {
			dispatch(setCurrentBill(data));
		});
		dispatch(setFetching(false));
	};
};

export default billsReducer;
