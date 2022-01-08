import React, { useState } from "react"

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'


const ListProductDashboard = (props) => {

	let products = props.products

	let renderProducts = products.map(
		(product, i) => 
			<tr key={product._id}>
				<td className="text-center" scope="row">{i+1}</td>
				<td className="text-center">{product.name}</td>
				<td className="text-center">{product.supplierName}</td>
				<td className="text-center">{product.amount}</td>
			</tr>
	)

	return (
		<div >
			<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
				<thead>
					<tr>
						<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
						<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
						<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
						<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
					</tr>	
				</thead>	
				<tbody>
					{renderProducts}
				</tbody>
			</table>
		</div>
		
	)
}

export default ListProductDashboard