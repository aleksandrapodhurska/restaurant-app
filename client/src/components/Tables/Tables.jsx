import React from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import TableItem from './TableItem/TableItem';
import style from './tables.module.css';


const Tables = (props) => {
	return (
		<>
			{props.isFetching && <Spinner/>}
			{props.tables && (
				<div className={style.tablesContainer}>
					{props.tables.map(table => <TableItem key={table._id} tableItem={table} toggleOccupied={props.toggleOccupied} isFetching={props.isFetching} tableWithSubMenu={props.tableWithSubMenu} toggleSubmenu={props.toggleSubmenu}/>)}
				</div>
			)
			}
		</>
		
	)
}

export default Tables