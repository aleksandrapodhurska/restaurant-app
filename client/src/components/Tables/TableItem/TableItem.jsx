import React from "react";
import style from "./tableItem.module.css";
import { BsPeopleFill} from "react-icons/bs";
import SubMenu from "../SubMenu/SubMenu";

const TableItem = (props) => {

	let seats = () => {
		switch (props.tableItem.seats) {
			case 2:
				return style.twoSeats;
			case 4:
				return style.fourSeats;
			case 6:
				return style.sixSeats;
			case 12:
				return style.twelveSeats;
			default:
				return style.fourSeats;
		}
	};

	const drawSeats = () => {
		let seats = [];
		for (let i = 0; i < props.tableItem.seats / 2; i++) {
			seats.push(<div key={i} className={style.seat}></div>);
		}
		return seats;
	};

	return (
		<>
			<div className={`${style.tableItem} ${seats()} ${
						props.tableItem.occupied ? style.occupied : style.free
					}`}
					onClick={() => props.toggleSubmenu(props.tableItem)}
			>
				<div className={style.tableInfo}>
					<div className={style.tableNumber}>{props.tableItem.tableNumber}</div>
					<div className={style.seatsNumber}><BsPeopleFill className={style.seatsNumberIcon}/><span>{props.tableItem.seats}</span></div>
				</div>
				<div className={style.seatsContainer}>
					{drawSeats()}
				</div>

				{props.tableWithSubMenu && props.tableWithSubMenu._id == props.tableItem._id ? (
					<SubMenu
						tableItem={props.tableItem}
						occupied={props.tableItem.occupied}
						toggleOccupied={props.toggleOccupied}
						reservation={props.tableItem.booking}
					/>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default TableItem;
