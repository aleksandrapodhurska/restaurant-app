import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import style from '../menu.module.css'

const MenuItems = (props) => {
	let menuItems = props.menu.map((item) => (
		<MenuItem
			key={item._id}
			menuItem={item}
			activeMenuItem={props.activeMenuItem}
			toggleMenuItem={props.toggleMenuItem}
			openBill={props.openBill}
			singleTable={props.singleTable}
		/>
	));
	return <div className={style.menuItemsWrapper}>{menuItems}</div>;
};

export default MenuItems;
