import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import MenuNavigation from "./MenuNavigation/MenuNavigation";
import style from "./menu.module.css";
import s from "../singleTable.module.css";
import MenuItems from "./MenuItems/MenuItems";

const Menu = (props) => {
	let { path } = useRouteMatch();

	return (
		<div className={`${s.menu} ${style.menu}`}>
			<MenuNavigation
				categories={props.categories}
				getMenu={props.getMenu}
			/>
			<div>
				<Route
					exact
					path={`${path}`}
					render={() => (
						<MenuItems
							menu={props.menu}
							activeMenuItem={props.activeMenuItem}
							toggleMenuItem={props.toggleMenuItem}
							openBill={props.openBill}
							currentBill={props.currentBill}
							toggleOcupied={props.toggleOcupied}
							addItemToBill={props.addItemToBill}
							singleTable={props.singleTable}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default Menu;