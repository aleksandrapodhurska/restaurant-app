import React from 'react';
import style from './billItem.module.css';
import {BsChevronRight} from 'react-icons/bs'

const BillItem = (props) => {
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
				<button className={style.seeMoreButton}><BsChevronRight/></button>
			</div>


		</>
	)
}

export default BillItem
