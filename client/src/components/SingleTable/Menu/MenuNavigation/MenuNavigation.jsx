import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom'
import style from './menuNavigation.module.css';
import s from '../menu.module.css';

const MenuNavigation = (props) => {
	let { url } = useRouteMatch();

	return (
		<div className={`${s.navBarWrapper} ${style.navBarWrapper}`}>
		<nav>
			<ul className={style.navBar}>
				{props.categories.map(category => (
					<li>
						<Link to={`${url}`} onClick={() => props.getMenu(category)}>{category}</Link>
					</li>
				))}
			</ul>
		</nav>

	</div>
	)
}

export default MenuNavigation
