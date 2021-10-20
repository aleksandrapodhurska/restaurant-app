import React from 'react';
import Spinner from '../Spinner/Spinner';
import MenuContainer from './Menu/MenuContainer';

const SingleTable = (props) => {
	// console.log(props);
	return (
		<div>
			{props.isFetching && <Spinner/>}
			{props.singleTable && (
					<MenuContainer singleTable={props.singleTable} isFetching={props.isFetching}/>
			)}
			
		</div>
	)
}

export default SingleTable
