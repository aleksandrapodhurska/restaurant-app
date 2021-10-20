import React from 'react';
import { connect } from 'react-redux'
import { setCurrentBillThunkCreator } from '../../../redux/billsReducer';
import Bill from './Bill';
import s from '../singleTable.module.css';
import style from './bill.module.css';

class BillContainer extends React.Component {
	componentDidMount() {
		let tableId = this.props.singleTableId;
		if (tableId) {
			this.props.setCurrentBill(tableId);
		}
	}
	render() {

		return (
			<div className={`${s.bill} ${style.order}`}>
				<Bill currentBill={this.props.currentBill} billItems={this.props.billItems} isFetching={this.props.isFetching}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentBill: state.billPage.currentBill,
		isFetching: state.billPage.isFetching,
		billItems: state.billPage.billItems
	}
}

export default connect(mapStateToProps, {
	setCurrentBill: setCurrentBillThunkCreator
})(BillContainer);
