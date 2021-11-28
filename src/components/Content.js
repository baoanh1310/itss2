import React, { useState } from "react"
import "./Content.css"
import SupplierModal from './SupplierModal'
import ProductModal from './ProductModal'
import ImportModal from './ImportModal'
import ExportModal from './ExportModal'

const Content = (props) => {
	let body;
	switch (props.model) {
		case "dashboard":
			body = <div></div>
			break
		case "supplier":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} model="supplier" />
				<SupplierTable />
			</div>
			break
		case "product":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} model="product" />
				<ProductTable />
			</div>
			break
		case "import":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} model="import" />
				<ImportTable />
			</div>
			break
		case "export":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} model="export" />
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
	const [modalShow, setModalShow] = useState(false)

	let modal;
	let modalId;
	switch (props.model) {
		case "supplier":
			modalId = "supplierNewModal"
			modal = <SupplierModal show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
			break
		case "product":
			modalId = "productNewModal"
			modal = <ProductModal show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
			break
		case "import":
			modalId = "importNewModal"
			modal = <ImportModal show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
			break
		case "export":
			modalId = "exportNewModal"
			modal = <ExportModal show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
			break
	}

	let btnText = "+".concat(props.btnTitle)
	let target = "#".concat(modalId)
	return (
		<div>
			<button className="btn btn-success add-btn" style={{marginTop: "40px"}} data-toggle="modal" data-target={target} onClick={() => setModalShow(true)} > 
				{btnText}
			</button>
			{modal}
		</div>
	)
}

const SupplierTable = (props) => {

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>ID</th>
					<th className="text-center" scope="col" style={{width: "60%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Apple</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
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
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Iphone</td>
					<td className="text-center">Apple</td>
					<td className="text-center">10</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
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
					<th className="text-center" scope="col" style={{width: "15%"}}>入庫日</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Iphone</td>
					<td className="text-center">Apple</td>
					<td className="text-center">10</td>
					<td className="text-center">2021-10-01 08:15:23</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
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
					<th className="text-center" scope="col" style={{width: "15%"}}>出庫日</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">Iphone</td>
					<td className="text-center">Apple</td>
					<td className="text-center">10</td>
					<td className="text-center">2021-10-01 08:15:23</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
				</tr>

			</tbody>
		</table>
	)
}

export default Content