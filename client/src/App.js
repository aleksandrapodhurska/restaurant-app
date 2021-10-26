import React from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SingleTableContainerWithRouter from "./components/SingleTable/SigleTableContainer";
import TablesContainer from "./components/Tables/TablesContainer";
import style from "./app.module.css";

const App = () => {
	return (
		<div className={style.app}>
			<Header className={style.header} />
			<main className={style.main}>
				<Route exact path="/">
					<Redirect to="/tables" />
				</Route>
				<Route
					exact
					path="/tables"
					render={() => <TablesContainer />}
				></Route>
				<Route
					exact
					path="/tables/:id"
					render={() => <SingleTableContainerWithRouter />}
				/>
			</main>
		</div>
	);
};

export default App;
