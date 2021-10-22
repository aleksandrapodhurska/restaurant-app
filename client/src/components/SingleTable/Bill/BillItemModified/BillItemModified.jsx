import React, { useState } from "react";
import style from "./billItemModified.module.css";

const BillItemModified = (props) => {
	const [quantity, setQuantity] = useState(props.billItem.quantity);
	const [total, setTotal] = useState(props.billItem.total);

	return (
				<div className={style.menuItem}>
					<div className={style.closeButton}>
						<button
							onClick={() => props.setModified(false)}
							
						>
							X
						</button>
					</div>
					<p className={style.menuItemName}>{props.billItem.name}</p>
					<p>Set quantity to:</p>
					<div className={style.menuItemButtons}>
						<button
							onClick={() => {
								setQuantity(quantity + 1);
								setTotal(
									(+total + +props.billItem.price).toFixed(2)
								);
							}}
						>
							+
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => {
								if (quantity === 1) {
									setQuantity(1);
								} else {
									setQuantity(quantity - 1);
									setTotal(
										(+total - +props.billItem.price).toFixed(
											2
										)
									);
								}
							}}
						>
							-
						</button>
					</div>
					<div className={style.menuItemPrice}>
						<p>$ {total}</p>
					</div>
					<div>
						<button
							onClick={() => {
								props.deleteItemInBill(props.billItem._id)
							}}
						>Delete</button>
					</div>
					<div className={style.menuItemAddButton}>
						<button
							onClick={() => {
									props.updateItemInBill({
										...props.billItem,
										quantity,
										total,
									})
									props.setModified(false)
							}}
						>
							SAVE
						</button>
					</div>
				</div>
	);
};

export default BillItemModified;
