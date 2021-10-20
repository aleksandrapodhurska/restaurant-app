import React from 'react'
import style from "../menuItem.module.css";
import dish from "../../../../../assets/img/dish.png";

const FrontSide = (props) => {
	return (
		<div
					className={style.menuItem}
					onClick={() => {
						props.toggleMenuItem(props.menuItem);
					}}
				>
					<div className={style.menuItemImage}>
						<img src={dish} alt="hummus photo" />
					</div>
					<div className={style.menuItemBody}>
						<div className={style.menuItemInfo}>
							<p className={style.menuItemName}>
								{props.menuItem.name}
							</p>
							<p className={style.menuItemDescription}>
								Lorem ipsum dolor sit amet consectetur adipis.
							</p>
						</div>
						<div className={style.menuItemPrice}>
							<p>200g</p>
							<p>{props.menuItem.price}</p>
						</div>
					</div>
				</div>
	)
}

export default FrontSide

{/* <button
	onClick={() => {
		props.singleTable.bill != null
			? props.addBillItem(
					props.singleTable._id,
					props.menuItem._id
				)
			: props.openBill(
					props.singleTable._id,
					props.menuItem._id
				);
	}}
>
	Add to Order
</button> */}