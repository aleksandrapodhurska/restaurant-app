import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SingleTableContainerWithRouter from "./components/SingleTable/SigleTableContainer";
import TablesContainer from "./components/Tables/TablesContainer";
import style from "./app.module.css";
import AuthContainer from "./components/Auth/AuthContainer";
import SignUp from "./components/Auth/SignUp/SignUp";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { checkAuthThunkCreator } from "./redux/authReducer";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
	const isAuth = useSelector((state) => state.auth.isAuth);
	const isFetching = useSelector((state) => state.auth.isFetching);

	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.token) {
			dispatch(checkAuthThunkCreator());
			console.log("useEffect");
		}
	}, []);

	return (
		<div className={style.app}>
			<Header className={style.header} />
			<main className={style.main}>
				{isFetching && <Spinner />}

				{isAuth && <Redirect to="/tables" />}
				{!isAuth && <Route path="/" render={() => <AuthContainer />} />}
				<ProtectedRoute
					exact
					path="/tables"
					component={TablesContainer}
				/>
				<ProtectedRoute
					exact
					path="/tables/:id"
					component={SingleTableContainerWithRouter}
				/>
			</main>
		</div>
	);
};

export default App;
