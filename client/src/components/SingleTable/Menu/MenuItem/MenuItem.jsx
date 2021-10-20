import React from "react";
import FrontSide from "./FrontSide/FrontSide";
import BackSide from "./BackSide/BackSide";


const MenuItem = (props) => {

	return (
		<>
			{!props.activeMenuItem.some(item => item._id === props.menuItem._id) ? (
				<FrontSide menuItem={props.menuItem} toggleMenuItem={props.toggleMenuItem} activeMenuItem={props.activeMenuItem}/>
			) : (
				<BackSide  menuItem={props.menuItem} toggleMenuItem={props.toggleMenuItem} activeMenuItem={props.activeMenuItem}/>
			)}
		</>
	);
};

export default MenuItem;