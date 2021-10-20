import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Submenu.module.css'

const SubMenu = (props) => {
	return (
		<div className={style.subMenu}>
				<div>
					<button className={style.occupyButton} onClick={() => props.toggleOccupied({
							...props.tableItem,
							occupied: !props.tableItem.occupied,
						})}>
						Occupy
					</button>
				</div>
				<div>
					<NavLink to={`/tables/${props.tableItem._id}`}>View Order</NavLink>
				</div>
				<div>Reservation</div>
			</div>
	)
}

export default SubMenu
