import React from 'react'
import BillItem from './BillItem/BillItem';
import s from '../singleTable.module.css'
import style from './bill.module.css'
import Spinner from '../../Spinner/Spinner';

const Bill = (props) => {

	return (
		<>
		{props.isFetching && <Spinner/>}
		<div className={style.tableTitle}>
			<div className={style.tableNumber}>
				<p>Table NO</p>
				<p>02</p>
			</div>
			<div className={style.guestsNumber}>
				<p>Guests</p>
				<p>2</p>
			</div>
		</div>
		
		<h3>Order</h3>			

		{props.billItems && (
			<>
			<div className={s.bill}>
				{props.billItems.map(item => <BillItem key={item._id} billItem={item}/>)}
			</div>
			<div className={style.buttonsBlock}>
				<button className={style.button}>Cancel Order</button>
				<button className={style.button}>Checkout</button>

			</div>
			</>
		)}
		</>
	)
}

export default Bill
