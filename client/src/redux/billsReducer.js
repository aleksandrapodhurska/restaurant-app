import dataBase from "../ajax/ajax";
const SET_CURRENT_BILL = "SET_CURRENT_BILL";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const OPEN_BILL = "OPEN_BILL";
const SET_BILL_ITEMS = "SET_BILL_ITEMS";
const CLEAR_BILL_ITEMS = "CLEAR_BILL_ITEMS";

const initialState = {
	currentBill: [],
	menuItems: [],
	billItems: [],
	isFetching: false,
};

const billsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_BILL:
			return {
				...state,
				currentBill: [...action.bill],
			};
		case SET_BILL_ITEMS:
			return {
				...state,
				billItems: [...state.billItems, action.item],
			};
		case CLEAR_BILL_ITEMS:
			return {
				...state,
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
				billItems: [action.bill.items],
			};
		default:
			return state;
	}
};
export const setFetching = (boolean) => ({ type: SET_IS_FETCHING, boolean });
export const setCurrentBill = (bill) => ({ type: SET_CURRENT_BILL, bill });
export const setBillItems = (item) => ({ type: SET_BILL_ITEMS, item });
export const clearBillItems = () => ({ type: CLEAR_BILL_ITEMS });

export const openBill = (bill) => ({
	type: OPEN_BILL,
	bill,
});

export const setCurrentBillThunkCreator = (tableId) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.getBill(tableId).then((data) => {
			console.log(data);
			dispatch(setCurrentBill(data)); // set currentBill [isOPen, items[]...]
			if (data.length > 0) {
				data[0].items.map((billItem) =>
					dataBase.getMenuItem(billItem).then((data) => {
						dispatch(setBillItems(data));
					})
				);
			} else {
				dispatch(clearBillItems());
			}
			dispatch(setFetching(false));
		});
	};
};

export const openBillItemThunkCreator = (tableId, menuItem) => {
	return (dispatch) => {
		dispatch(setFetching(true));
		dataBase.openBill(tableId, menuItem).then((data) => {
			console.log(data);
			dispatch(openBill(data));
			dataBase.getMenuItem(data[0]).then((data) => {
				dispatch(setBillItems(data));
			});
			dispatch(setFetching(false));
		});
	};
};

export default billsReducer;
