import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import style from "./header.module.css";
import userImage from '../../assets/img/userImage.png'

const Header = () => {
	let location = useLocation();
	return (
		<div className={style.header}>
			<div className={style.userInfo}>
					<img src={userImage}></img>
					<p>Username</p>
				</div>
				
			<nav className={style.navigation}>
				{location.pathname !== "/tables" && <NavLink to='/tables'>Back to Tables</NavLink>}
				{location.pathname == "/tables" && <NavLink to="/">Menu</NavLink>}
				<NavLink to="/">Log Out</NavLink>
			</nav>
		</div>
	)
}

export default Header
