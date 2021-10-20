import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

const Header = () => {
	let location = useLocation();
	return (
		<div>
			<nav>
			{location.pathname !== "/tables" && <NavLink to='/tables'>Back to Tables Scheme</NavLink>}
				
			</nav>
		</div>
	)
}

export default Header
