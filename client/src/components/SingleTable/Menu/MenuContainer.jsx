import React from "react";
import { connect } from "react-redux";
import {
	getMenuThunkCreator,
	toggleMenuItem,
	clearActiveMenuItem,
	getCategoriesThunkCreator,
	getMenuByCategoryThunkCreator
} from "../../../redux/menuReducer";
import { openBillItemThunkCreator , addItemToBill} from "../../../redux/billsReducer";
import {toggleOccupiedThunkCreator} from "../../../redux/tablesReducer";
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
				currentBill={this.props.currentBill}
				toggleMenuItem={this.props.toggleMenuItem}
				toggleOcupied={this.props.toggleOcupied}
				addItemToBill={this.props.addItemToBill}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		menu: state.menuPage.menu,
		activeMenuItem: state.menuPage.activeMenuItem,
		categories: state.menuPage.categories,
		currentBill: state.billPage.currentBill
	};
};

export default connect(mapStateToProps, {
	// getMenu: getMenuThunkCreator,
	getMenu: getMenuByCategoryThunkCreator,
	getCategories: getCategoriesThunkCreator,
	openBill: openBillItemThunkCreator,
	toggleMenuItem,
	clearActiveMenuItem,
	toggleOcupied: toggleOccupiedThunkCreator,
	addItemToBill,

})(MenuContainer);
