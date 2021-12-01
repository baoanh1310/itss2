import React, { useState, useEffect } from "react"
import "./Content.css"

import Profile from './Profile'

import SupplierModal from './SupplierModal'
import ProductModal from './ProductModal'
import ImportModal from './ImportModal'
import ExportModal from './ExportModal'

import SupplierService from '../apis/SupplierService'
import ProductService from '../apis/ProductService'
import ImportService from '../apis/ImportService'
import ExportService from '../apis/ExportService'

const Content = (props) => {

	const [suppliers, setSuppliers] = useState([])
	const [products, setProducts] = useState([])
	const [imports, setImports] = useState([])
	const [eports, setEports] = useState([])

	const fetchSuppliers = async () => {
		const res = await SupplierService.getSuppliers()
		setSuppliers(res.data.suppliers)
	}

	const fetchProducts = async () => {
		const res = await ProductService.getProducts()
		setProducts(res.data.products)
	}

	useEffect(() => {
		fetchSuppliers()
		fetchProducts()
	}, [])

	let body;
	switch (props.model) {
		case "dashboard":
			body = <div></div>
			break
		case "supplier":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} model="supplier" />
				<SupplierTable suppliers={suppliers} />
			</div>
			break
		case "product":
			body = <div>
				<AddBtn btnTitle={props.btnTitle} model="product" />
				<ProductTable products={products} />
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
			body = <div>
				<Profile />
			</div>
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

const SupplierTable = ({suppliers}) => {

	let renderSuppliers = suppliers.map(
		(supplier, i) => 
			<tr key={supplier._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{supplier.name}</td>
				<td className="text-center">
					<button>編集</button>
				</td>
				<td className="text-center">
					<button>消去</button>
				</td>
			</tr>
		)

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
					<th className="text-center" scope="col" style={{width: "60%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				{renderSuppliers}
			</tbody>
		</table>
	)
}

const ProductTable = (props) => {

	// let products = props.products
	// let renderProducts = products.map((product, i) => <tr key={product.id}></tr>)

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
					<th className="text-center" scope="col" style={{width: "30%"}}>製品名</th>
					<th className="text-center" scope="col" style={{width: "30%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				<tr>
					<th className="text-center" scope="row">1</th>
					<td className="text-center">キュウリ</td>
					<td className="text-center">VinFarm</td>
					<td className="text-center">10</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
				</tr>
				<tr>
					<th className="text-center" scope="row">2</th>
					<td className="text-center">じゃがいも</td>
					<td className="text-center">Notifarm</td>
					<td className="text-center">142</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
				</tr>
				<tr>
					<th className="text-center" scope="row">3</th>
					<td className="text-center">玉ねぎ</td>
					<td className="text-center">VinaOrganic</td>
					<td className="text-center">15</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
				</tr>
				<tr>
					<th className="text-center" scope="row">4</th>
					<td className="text-center">ニンニク</td>
					<td className="text-center">HP-Farm</td>
					<td className="text-center">2</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
				</tr>
				<tr>
					<th className="text-center" scope="row">5</th>
					<td className="text-center">にんじん</td>
					<td className="text-center">HN-Organic</td>
					<td className="text-center">100</td>
					<td className="text-center">
						<button>編集</button>
					</td>
					<td className="text-center">
						<button>消去</button>
					</td>
				</tr>
				<tr>
					<th className="text-center" scope="row">6</th>
					<td className="text-center">ヤムイモ</td>
					<td className="text-center">TayBac</td>
					<td className="text-center">101</td>
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
					<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" style={{width: "10%"}}>受取番号</th>
					<th className="text-center" scope="col" style={{width: "15%"}}>入庫日</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				

			</tbody>
		</table>
	)
}

const ExportTable = (props) => {

	return (
		<table className="table table-striped table-bordered" style={{width: "100%"}}>
			<thead>
				<tr>
					<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
					<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
					<th className="text-center" scope="col" style={{width: "10%"}}>受取番号</th>
					<th className="text-center" scope="col" style={{width: "15%"}}>出庫日</th>
					<th className="text-center" scope="col" colSpan="2">アクション</th>
				</tr>	
			</thead>	
			<tbody>
				

			</tbody>
		</table>
	)
}

export default Content