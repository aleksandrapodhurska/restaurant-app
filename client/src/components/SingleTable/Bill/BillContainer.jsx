import React from "react";
import { connect } from "react-redux";
import {
	setCurrentBillThunkCreator,
	confirmOrderThunkCreator,
	updateItemInBill,
	deleteItemInBill,
} from "../../../redux/billsReducer";
import Bill from "./Bill";
import s from "../singleTable.module.css";
import style from "./bill.module.css";
import Spinner from "../../Spinner/Spinner";

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
				{this.props.isFetching && <Spinner />}
				{this.props.currentBill != null && (
					<Bill
						tableNumber={this.props.tableNumber}
						currentBill={this.props.currentBill}
						billItems={this.props.billItems}
						isFetching={this.props.isFetching}
						confirmBill={this.props.confirmBill}
						updateItemInBill={this.props.updateItemInBill}
						deleteItemInBill={this.props.deleteItemInBill}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentBill: state.billPage.currentBill,
		isFetching: state.billPage.isFetching,
		billItems: state.billPage.billItems,
	};
};

export default connect(mapStateToProps, {
	setCurrentBill: setCurrentBillThunkCreator,
	confirmBill: confirmOrderThunkCreator,
	updateItemInBill,
	deleteItemInBill,
})(BillContainer);
