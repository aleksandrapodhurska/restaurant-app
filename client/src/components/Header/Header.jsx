import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import style from "./header.module.css";
import userImage from "../../assets/img/userImage.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authReducer";

const Header = () => {
	let location = useLocation();

	const isAuth = useSelector((state) => state.auth.isAuth);
	const dispatch = useDispatch();

	return (
		<div className={style.header}>
			{isAuth &&
			
			<div className={style.userInfo}>
				<img src={userImage}></img>
				<p>Username</p>
			</div>
			}

			<nav className={style.navigation}>
				{!isAuth ? (
					<>
						<NavLink to="/">Login</NavLink>
						<NavLink to="/registration">Sign Up</NavLink>
					</>
				) : (
					<>
						{location.pathname !== "/tables" && (
							<NavLink to="/tables">Back to Tables</NavLink>
						)}
						<Link to="/" onClick={() => dispatch(logout())}>
							Log Out
						</Link>
					</>
				)}

				{/*  */}
			</nav>
		</div>
	);
};

export default Header;
