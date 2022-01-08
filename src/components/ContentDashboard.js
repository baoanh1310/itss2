import React from "react"

import "./Content.css"

import ListProductDashboard from "./ListProductDashboard";
import ListSupplierDashboard from "./ListSupplierDashboard";

const ContentDashboard = (props) => {

	let label = "New World - ".concat(props.label)

    let numberSupplier = props.suppliers.length;
    let numberProductCategories = props.products.length;
    let numberAlmostOutOfStock = props.products.filter(product => product.amount < 10 && product.amount > 0).length;
    let numberOutOfStock = props.products.filter(product => product.amount == 0).length;
	

	


	let body;
	switch (props.model) {
		
		case "products":
			body = <div >
				<Label label={props.label} />
				<ListProductDashboard className="custom-table" products={props.products} />
			</div>
			break
		case "suppliers":
			body = <div>
				<Label label={props.label} />
				<ListSupplierDashboard className="custom-table" suppliers={props.suppliers} />
			</div>
			break
		case "products_sap_het":
			body = <div>
				<Label label={props.label} />
				<ListProductDashboard className="custom-table" products={props.products.filter(product => product.amount < 10 && product.amount > 0)}/>
			</div>
			break
		case "products_da_het":
			body = <div>
				<Label label={props.label} />
				<ListProductDashboard className="custom-table" products={props.products.filter(product => product.amount == 0)} />
			</div>
			break
		default:
			body = <div></div>
	}


	return (
		<div id="content">
			{body}
		</div>
	)
}

const Label = (props) => {
	return (
		<div className="label-btn">
			<div className="page-label text-center">
				<h1>{props.label}</h1>
			</div>
		</div>
		
	)
}


export default ContentDashboard