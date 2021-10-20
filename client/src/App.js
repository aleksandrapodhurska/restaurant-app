import React from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SingleTableContainerWithRouter from "./components/SingleTable/SigleTableContainer";
import TablesContainer from "./components/Tables/TablesContainer";

const App = () => {
	return (
		<div>
			<Header />
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
		</div>
	);
};

export default App;
