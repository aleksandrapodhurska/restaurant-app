import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import style from "./signup.module.css";

const SignUp = (props) => {
	const [form, setForm] = useState({
		password: "",
		email: "",
	});

	const fillForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const proceedSignUp = (form) => {
		props.signup(form);
		setForm({
			password: "",
			email: "",
		})
	};

	if (props.signUpStatus.hasSignedUp) return <Redirect to={"/"} />;

	return (
		<div className={style.formWrapper}>
			<div className={style.formTitle}>
				<h3>Please sign up</h3>
			</div>
			<form onSubmit={(e) => e.preventDefault()} className={style.form}>
				<div className={style.field}>
					<input
						type="email"
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
					<button className={style.loginBtn} onClick={() => proceedSignUp(form)}>Sign Up</button>
				</div>
				<div className={style.link}>
					<p>
						Already have an account? Proceed to <Link to="/">log in</Link>
					</p>
				</div>
			</form>

			
			<p>{props.signUpStatus.message}</p>
		</div>
	);
};

export default SignUp;
