import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfprops }) => {
	const isAuth = useSelector((state) => state.auth.isAuth);

	return (
		<Route
			{...restOfprops}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default ProtectedRoute;
