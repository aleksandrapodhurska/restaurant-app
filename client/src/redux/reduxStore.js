import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import menuReducer from "./menuReducer";
import tablesReducer from "./tablesReducer";
import billsReducer from "./billsReducer";
import authReducer from "./authReducer";

const reducers = combineReducers({
	menuPage: menuReducer,
	tablesPage: tablesReducer,
	billPage: billsReducer,
	auth: authReducer,
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
