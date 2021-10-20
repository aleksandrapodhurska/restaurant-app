import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import menuReducer from "./menuReducer";
import tablesReducer from "./tablesReducer";
import billsReducer from "./billsReducer";

const reducers = combineReducers({
	menuPage: menuReducer,
	tablesPage: tablesReducer,
	billPage: billsReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
