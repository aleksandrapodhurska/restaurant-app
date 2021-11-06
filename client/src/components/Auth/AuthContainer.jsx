import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import {
	logInThunkCreator,
	signUpThunkCreator,
} from "../../redux/authReducer";

class AuthContainer extends React.Component {
	componentDidMount() {
		
	}

	render() {
		return (
			<div>
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<Login
								isAuth={this.props.isAuth}
								user={this.props.user}
								isFetching={this.props.isFetching}
								login={this.props.logIn}
								signUpStatus={this.props.signUpStatus}
							/>
						)}
					/>
					<Route
						exact
						path="/registration"
						render={() => (
							<SignUp
								isAuth={this.props.isAuth}
								user={this.props.user}
								isFetching={this.props.isFetching}
								signup={this.props.signup}
								signUpStatus={this.props.signUpStatus}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.auth.isAuth,
		user: state.auth.user,
		isFetching: state.auth.isFetching,
		signUpStatus: state.auth.signUpStatus
	};
};

const AuthContainerWithRouter = withRouter(AuthContainer);

export default connect(mapStateToProps, {
	signup: signUpThunkCreator,
	logIn: logInThunkCreator,
})(AuthContainerWithRouter);
