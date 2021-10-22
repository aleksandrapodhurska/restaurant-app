import React from "react";
import Tables from "./Tables";
import { connect } from "react-redux";
import {
	getTablesThunkCreator,
	toggleOccupiedThunkCreator,
	toggleSubmenu,
	closeSubmenu,
} from "../../redux/tablesReducer";

const mapStateToProps = (state) => {
	return {
		tables: state.tablesPage.tables,
		isFetching: state.tablesPage.isFetching,
		tableWithSubMenu: state.tablesPage.activeTable,
	};
};

class TablesContainer extends React.Component {
	componentDidMount() {
		this.props.getTables();
	}

	componentWillUnmount() {
		this.props.closeSubmenu();
	}

	render() {
		return (
			<Tables
				tables={this.props.tables}
				isFetching={this.props.isFetching}
				tableWithSubMenu={this.props.tableWithSubMenu}
				toggleOccupied={this.props.toggleOccupied}
				toggleSubmenu={this.props.toggleSubmenu}
			/>
		);
	}
}

export default connect(mapStateToProps, {
	getTables: getTablesThunkCreator,
	toggleOccupied: toggleOccupiedThunkCreator,
	toggleSubmenu,
	closeSubmenu,
})(TablesContainer);
