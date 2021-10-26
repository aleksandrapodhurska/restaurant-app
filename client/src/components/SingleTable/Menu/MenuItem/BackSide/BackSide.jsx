import React from "react";
import { useState } from "react";
import style from "../menuItem.module.css";

const BackSide = (props) => {
	const [quantity, setQuantity] = useState(1);
	return (
		<div
			className={style.menuItem}
			onClick={() => {
				props.toggleMenuItem(props.menuItem);
			}}
		>
			<div className={style.menuItemButtons}>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setQuantity(quantity + 1);
					}}
				>
					+
				</button>
				<span>{quantity}</span>
				<button
					onClick={(e) => {
						e.stopPropagation();
						quantity === 1
							? setQuantity(1)
							: setQuantity(quantity - 1);
					}}
				>
					-
				</button>
			</div>
			<div className={style.menuItemPrice}>
				<p>$ {props.menuItem.price}</p>
			</div>
			<div className={style.menuItemBody}>
				<div className={style.menuItemInfo}>
					<p className={style.menuItemName}>{props.menuItem.name}</p>
					<p className={style.menuItemDescription}>
					{props.menuItem.description}
					</p>
				</div>
				<div className={style.menuItemAddButton}>
					<button
						onClick={(e) => {
							e.stopPropagation();
							if (props.currentBill === null || props.currentBill.length === 0) {
								props.openBill(props.singleTable._id, {
									...props.menuItem,
									quantity,
									total: (props.menuItem.price * quantity).toFixed(2),
							  })
							//   props.toggleOcupied(props.singleTable._id)
							} else {
								props.addItemToBill({
									...props.menuItem,
									quantity,
									total: props.menuItem.price * quantity,
							  })
							}
							setQuantity(1);
						}}
					>
						ADD
					</button>
				</div>
			</div>
		</div>
	);
};

export default BackSide;