import React, { useState } from "react"
import "./Content.css"

const Content = (props) => {
	let body;
	switch (props.model) {
		case "dashboard":
			body = <div></div>
			break
		case "supplier":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} />
				<SupplierTable />
			</div>
			break
		case "product":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} />
				<ProductTable />
			</div>
			break
		case "import":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} />
				<ImportTable />
			</div>
			break
		case "export":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} />
				<ExportTable />
			</div>
			break
		case "report":
			body = <div></div>
			break
		case "profile":
			body = <div></div>
			break
	}

	return (
		<div id="content">
			<div className="label-btn">
				<Label label={props.label} />
			</div>
			{body}
		</div>
	)
}

const Label = (props) => {
	return (
		<div className="page-label">
			<h3>{props.label}</h3>
		</div>
	)
}

const AddBtn = (props) => {
	let btnText = "+".concat(props.btnTitle)
	return (
		<button className="btn btn-primary add-btn" style={{marginTop: "40px"}}> 
			{btnText}
		</button>
	)
}

const SupplierTable = (props) => {

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>ID</th>
					<th className="text-center" scope="col" style={{width: "60%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" colspan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Apple</td>
					<td className="text-center">編集</td>
					<td className="text-center">消去</td>
				</tr>

			</tbody>
		</table>
	)
}

const ProductTable = (props) => {

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>ID</th>
					<th className="text-center" scope="col" style={{width: "30%"}}>製品名</th>
					<th className="text-center" scope="col" style={{width: "30%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
					<th className="text-center" scope="col" colspan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Iphone</td>
					<td className="text-center">Apple</td>
					<td className="text-center">10</td>
					<td className="text-center">編集</td>
					<td className="text-center">消去</td>
				</tr>

			</tbody>
		</table>
	)
}

const ImportTable = (props) => {

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>ID</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" style={{width: "10%"}}>受取番号</th>
					<th className="text-center" scope="col" style={{width: "20%"}}>入庫日</th>
					<th className="text-center" scope="col" colspan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Iphone</td>
					<td className="text-center">Apple</td>
					<td className="text-center">10</td>
					<td className="text-center">2021-10-01 08:15:23</td>
					<td className="text-center">編集</td>
					<td className="text-center">消去</td>
				</tr>

			</tbody>
		</table>
	)
}

const ExportTable = (props) => {

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>ID</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" style={{width: "10%"}}>受取番号</th>
					<th className="text-center" scope="col" style={{width: "20%"}}>出庫日</th>
					<th className="text-center" scope="col" colspan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Iphone</td>
					<td className="text-center">Apple</td>
					<td className="text-center">10</td>
					<td className="text-center">2021-10-01 08:15:23</td>
					<td className="text-center">編集</td>
					<td className="text-center">消去</td>
				</tr>

			</tbody>
		</table>
	)
}

export default Content