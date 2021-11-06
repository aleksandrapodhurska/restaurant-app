import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import style from "./login.module.css";

const Login = (props) => {

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const fillForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const proceedLogin = (form) => {
		props.login(form);
		setForm({
			email: "",
			password: "",
		})
	};

	if (props.signUpStatus.hasSignedUp) return <Redirect to={"/tables"} />;

	return (
		<div className={style.formWrapper}>
			<div className={style.formTitle}>
				<h3>Please login</h3>
			</div>
			<form onSubmit={(e) => e.preventDefault()} className={style.form}>
				<div className={style.field}>
					<input
						type="text"
						name="email"
						placeholder="Enter your email"
						onChange={(e) => fillForm(e)}
						required
					/>
				</div>
				<div className={style.field}>
					<input
						type="password"
						name="password"
						placeholder="Enter your password"
						onChange={(e) => fillForm(e)}
						required
					/>
				</div>
				<div className={style.field}>
					<button
						className={style.loginBtn}
						onClick={() => proceedLogin(form)}
					>
						Log In
					</button>
				</div>
				<div className={style.link}>
					<p>
						<Link>Forgot password?</Link>
					</p>
				</div>

				{!props.signUpStatus.hasSignedUp && (
					<div className={style.link}>
						<p>
							Don't have an account yet? Proceed to{" "}
							<Link to="/registration">sign up</Link>
						</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default Login;
