import React from 'react';
import style from "../menuItem.module.css";

const BackSide = (props) => {
	return (
		<div
					className={style.menuItem}
					onClick={() => {
						props.toggleMenuItem(props.menuItem);
					}}
				>
					<div className={style.menuItemButtons}>
						<button>+</button>
						<span>1</span>
						<button>-</button>
					</div>
					<div className={style.menuItemPrice}>
						<p>$ 8.98</p>
					</div>
					<div className={style.menuItemBody}>
						<div className={style.menuItemInfo}>
							<p className={style.menuItemName}>
								{props.menuItem.name}
							</p>
							<p className={style.menuItemDescription}>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit.
							</p>
						</div>
						<div className={style.menuItemAddButton}>
							<button
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
								ADD
							</button>
						</div>
					</div>
				</div>
	)
}

export default BackSide
