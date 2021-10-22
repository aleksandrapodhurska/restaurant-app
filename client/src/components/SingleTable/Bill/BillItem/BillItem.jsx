import React, { useState } from "react";
import style from "./billItem.module.css";
import { BsChevronRight } from "react-icons/bs";
import BillItemModified from "../BillItemModified/BillItemModified";

const BillItem = (props) => {
	const [modified, setModified] = useState(false);
	return (
		<>
			<div className={style.orderItem}>
				<div className={style.orderItemTitle}>
					<span>{props.billItem.name}</span>
				</div>
				<div className={style.orderItemQty}>
					<span>{props.billItem.quantity}</span>
				</div>
				<div className={style.orderItemTotal}>
					<span>{props.billItem.total}</span>
				</div>
				<button
					className={style.seeMoreButton}
					onClick={() => setModified(!modified)}
				>
					<BsChevronRight />
				</button>
			</div>
			{modified && (
				<BillItemModified
					billItem={props.billItem}
					modified={modified}
					setModified={setModified}
					updateItemInBill={props.updateItemInBill}
					deleteItemInBill={props.deleteItemInBill}
				/>
			)}
		</>
	);
};

export default BillItem;
