import React from "react";
import { connect } from "react-redux";
import {
	getMenuThunkCreator,
	toggleMenuItem,
	clearActiveMenuItem,
	getCategoriesThunkCreator,
	getMenuByCategoryThunkCreator
} from "../../../redux/menuReducer";
import { openBillItemThunkCreator } from "../../../redux/billsReducer";
import Menu from "./Menu";

class MenuContainer extends React.Component {
	componentDidMount() {
		// this.props.getMenu();
		this.props.getCategories()
	}

	componentWillUnmount() {
		this.props.clearActiveMenuItem();
	}

	render() {
		return (
			<Menu
				getMenu={this.props.getMenu}
				menu={this.props.menu}
				categories={this.props.categories}
				activeMenuItem={this.props.activeMenuItem}
				openBill={this.props.openBill}
				singleTable={this.props.singleTable}
				toggleMenuItem={this.props.toggleMenuItem}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menu: state.menuPage.menu,
		singleTable: state.tablesPage.singleTable,
		activeMenuItem: state.menuPage.activeMenuItem,
		categories: state.menuPage.categories,
	};
};

export default connect(mapStateToProps, {
	// getMenu: getMenuThunkCreator,
	getMenu: getMenuByCategoryThunkCreator,
	getCategories: getCategoriesThunkCreator,
	openBill: openBillItemThunkCreator,
	toggleMenuItem,
	clearActiveMenuItem,
	

})(MenuContainer);
