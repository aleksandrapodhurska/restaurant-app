import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleTableThunkCreator } from "../../redux/tablesReducer";
import SingleTable from "./SingleTable";
import BillContainer from "./Bill/BillContainer";
import style from "./singleTable.module.css";
import Spinner from "../Spinner/Spinner";

class SigleTableContainer extends React.Component {
	componentDidMount() {
		const { match } = this.props;
		let tableId = match.params.id;
		if (tableId) {
			this.props.getSingleTable(tableId);
		}
	}

	render() {
		const { match } = this.props;
		let tableId = match.params.id;
		return (
			<>
				{this.props.isFetching && <Spinner />}
				{this.props.singleTable && (
					<div className={style.singleTableContainer}>
						<SingleTable
							singleTable={this.props.singleTable}
							isFetching={this.props.isFetching}
						/>
						<BillContainer
							singleTableId={tableId}
							tableNumber={this.props.singleTable.tableNumber}
						/>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		singleTable: state.tablesPage.singleTable,
		isFetching: state.tablesPage.isFetching,
	};
};

const SingleTableContainerWithRouter = withRouter(SigleTableContainer);

export default connect(mapStateToProps, {
	getSingleTable: getSingleTableThunkCreator,
})(SingleTableContainerWithRouter);
