import React from "react";
import Spinner from "../Spinner/Spinner";
import MenuContainer from "./Menu/MenuContainer";

const SingleTable = (props) => {
	return (
		<>
			{props.isFetching && <Spinner />}
			{props.singleTable && (
				<MenuContainer
					singleTable={props.singleTable}
					isFetching={props.isFetching}
				/>
			)}
		</>
	);
};

export default SingleTable;
