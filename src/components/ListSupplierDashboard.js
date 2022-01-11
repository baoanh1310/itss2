import React, { useState } from "react"

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const ListSupplierDashboard = (props) => {

	let suppliers = props.suppliers

	let renderSuppliers = suppliers.map(
		(supplier, i) => 
			<tr key={supplier._id}>
				<td className="text-center" scope="row">{i+1}</td>
				<td className="text-center">{supplier.name}</td>
				<td className="text-center">{supplier.phoneNumber}</td>
				<td className="text-center">{supplier.address}</td>
			</tr>
		)

	

	return (
		<div className="table-bound">
			<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
				<thead>
					<tr>
						<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
						<th className="text-center" scope="col" style={{width: "20%"}}>サプライヤー名</th>
						<th className="text-center" scope="col" style={{width: "15%"}}>サプライヤー電話番号</th>
						<th className="text-center" scope="col" style={{width: "30%"}}>サプライヤー住所</th>
					</tr>	
				</thead>	
				<tbody>
					{renderSuppliers}
				</tbody>
			</table>
		</div>
		
	)
}

export default ListSupplierDashboard