import React, { useState, useEffect } from "react"
import Popup from "reactjs-popup";

import "./Content.css"

import Profile from './Profile'
import Dashboard from './Dashboard'
import Report from './Report'
import Navbar from './Navbar'

import SupplierModal from './SupplierModal'
import ProductModal from './ProductModal'
import ImportModal from './ImportModal'
import ExportModal from './ExportModal'

import SupplierService from '../apis/SupplierService'
import ProductService from '../apis/ProductService'
import ImportService from '../apis/ImportService'
import ExportService from '../apis/ExportService'

import UpdateProduct from "./UpdateProduct"
import UpdateSupplierModal from "./UpdateSupplierModal"
import DeleteSupplierModal from "./DeleteSupplierModal"
import { create } from "@mui/material/styles/createTransitions"

const Content = (props) => {

	const [suppliers, setSuppliers] = useState([])
	const [products, setProducts] = useState([])
	const [imports, setImports] = useState([])
	const [eports, setEports] = useState([])
	const [searchResult, setSearchResult] = useState([])
	const [search, setSearch] = useState("")

	const handleSearchChange = (e) => {
		setSearch(e.target.value.toString().toLowerCase())
		setSearchResult(products.filter(product => product.name.includes(search)))
		// setProducts(products.filter(product => product.name.includes(search)))
		console.log("Raw Search: ", search)
		console.log("Search result: ", searchResult)
	}

	const handleSearch = (e) => {
		e.preventDefault()
		
		window.location.replace('/searchResult')
	}

	const fetchSuppliers = async () => {
		const res = await SupplierService.getSuppliers()
		setSuppliers(res.data.suppliers)
	}

	const fetchProducts = async () => {
		const res = await ProductService.getProducts()
		setProducts(res.data.products)
	}

	const fetchImportProducts = async () => {
		const res = await ImportService.getProducts()
		setImports(res.data.products)
	}

	const fetchExportProducts = async () => {
		const res = await ExportService.getProducts()
		setEports(res.data.products)
	}

	useEffect(() => {
		fetchSuppliers()
		fetchProducts()
		fetchImportProducts()
		fetchExportProducts()
	}, [])

	let body;
	switch (props.model) {
		case "dashboard":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<Dashboard suppliers={suppliers} products={products} />
			</div>
			break
		case "supplier":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<AddBtn btnTitle={props.btnTitle} model="supplier" />
				<SupplierTable className="custom-table" suppliers={suppliers} />
			</div>
			break
		case "product":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<AddBtn btnTitle={props.btnTitle} model="product" suppliers={suppliers} />
				<ProductTable className="custom-table" products={products} />
			</div>
			break
		case "searchResult":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<ProductTable className="custom-table" products={searchResult} search={search} />
			</div>
			break
		case "import":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<AddBtn btnTitle={props.btnTitle} model="import" suppliers={suppliers} products={products} />
				<ImportTable className="custom-table" imports={imports} />
			</div>
			break
		case "export":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<AddBtn btnTitle={props.btnTitle} model="export" suppliers={suppliers} products={products} />
				<ExportTable className="custom-table" eports={eports} />
			</div>
			break
		case "report":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<Report products={products} suppliers={suppliers} imports={imports} eports={eports} />
			</div>
			break
		case "profile":
			body = <div>
				<Navbar user_email={props.user_email} products={products} handleSearchChange={handleSearchChange} handleSearch={handleSearch} />
				<Label label={props.label} />
				<Profile />
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
			<div className="page-label">
				<h3>{props.label}</h3>
			</div>
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
			modal = <ProductModal suppliers={props.suppliers} show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
			break
		case "import":
			modalId = "importNewModal"
			modal = <ImportModal suppliers={props.suppliers} products={props.products} show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
			break
		case "export":
			modalId = "exportNewModal"
			modal = <ExportModal suppliers={props.suppliers} products={props.products} show={modalShow} onHide={() => setModalShow(false)} modalId={modalId} />
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

	let popupUpdate;
	let popupDelete;

	const [showPopupUpdate, setShowPopupUpdate] = useState(false)
	const [showPopupDelete, setShowPopupDelete] = useState(false)
	const [supplierIndex, setSupplierIndex] = useState(-1)

	const onUpdateSupplierButtonChange = (e) => {
		e.preventDefault()
		setSupplierIndex(e.target.value)
		setShowPopupUpdate(true)
	}

	if (showPopupUpdate) {
		let supplier = suppliers.at(supplierIndex)
		popupUpdate = <UpdateSupplierModal supplier={supplier} />
	}

	const onDeleteSupplierButtonChange = (e) => {
		e.preventDefault()
		setSupplierIndex(e.target.value)
		setShowPopupDelete(true)
	}

	if (showPopupDelete) {
		let supplier = suppliers.at(supplierIndex)
		popupDelete = <DeleteSupplierModal supplier={supplier} />
	}

	let renderSuppliers = suppliers.map(
		(supplier, i) => 
			<tr key={supplier._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{supplier.name}</td>
				<td className="text-center">
					<button className="btn btn-primary" 
						data-toggle="modal" 
						data-target=".update-supplier" 
						id={supplier._id}
						value={i}
						onClick={onUpdateSupplierButtonChange}>編集
					</button>
					{popupUpdate}
				
				</td>
				<td className="text-center">
					<button className="btn btn-danger" 
						data-toggle="modal" 
						data-target=".delete-supplier" 
						id={supplier._id}
						value={i}
						onClick={onDeleteSupplierButtonChange}>消去
					</button>
					{popupDelete}
				</td>
			</tr>
		)

	

	return (
		<div className="table-bound">
			<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
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
		</div>
		
	)
}

const ProductTable = (props) => {

	let popupUpdate = <div></div>
	let popupDelete = <div></div>
	const [showPopupUpdate, setShowPopupUpdate] = useState(false)
	const [productIndex, setProductIndex] = useState(0)
	let products = props.products;
	console.log("Products: ", products)
	console.log("Search: ", props.search)

	const onUpdateProductButonChange = (e) =>{
		e.preventDefault()
		setProductIndex(e.target.value)
		setShowPopupUpdate(true)
	}

	if (showPopupUpdate){
		let product = products.at(productIndex)
		popupUpdate = <UpdateProduct product = {product} />
	}

	// let products = props.products

	const onDeleteProductButonChange = (e) => {
		let index = e.target.value
		let productDelete = products.at(productIndex)
		ProductService.delProducts(productDelete._id)
	}
	

	let renderProducts = products.map(
		(product, i) => 
			<tr key={product._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{product.name}</td>
				<td className="text-center">{product.supplierName}</td>
				<td className="text-center">{product.amount}</td>
				<td className="text-center">
					<button className="btn btn-primary" 
						data-toggle="modal" 
						data-target=".update-product" 
						id={product._id}
						value={i}
						onClick={onUpdateProductButonChange}>編集
					</button>
					{popupUpdate}
				
				</td>
				<td className="text-center">
					<button 
					value={i}
					onClick={onDeleteProductButonChange}>消去</button>
				</td>
			</tr>
	)

	return (
		<div>
			<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
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
					{renderProducts}
				</tbody>
			</table>
		</div>
		
	)
}

const ImportTable = (props) => {

	const getDateFormat = (miliseconds) => {
		let date = new Date(miliseconds)
		let day = date.getDate().toString()
		let month = (date.getMonth()+1).toString()
		let year = date.getFullYear().toString()
		let result = day.concat("-").concat(month).concat("-").concat(year)
		return result
	}

	let sortedImports = props.imports.sort((a, b) => a.time - b.time)

	let renderImports = sortedImports.map(
		(productImport, i) => 
			<tr key={productImport._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{productImport.productName}</td>
				<td className="text-center">{productImport.supplierName}</td>
				<td className="text-center">{productImport.amount}</td>
				<td className="text-center">{getDateFormat(productImport.time)}</td>
			</tr>
	)

	return (
		<div className="table-bound">
			<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
				<thead>
					<tr>
						<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
						<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
						<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
						<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
						<th className="text-center" scope="col" style={{width: "20%"}}>入庫日</th>
					</tr>	
				</thead>	
				<tbody>
					{renderImports}
				</tbody>
			</table>
		</div>
		
	)
}

const ExportTable = (props) => {

	const getDateFormat = (miliseconds) => {
		let date = new Date(miliseconds)
		let day = date.getDate().toString()
		let month = (date.getMonth()+1).toString()
		let year = date.getFullYear().toString()
		let result = day.concat("-").concat(month).concat("-").concat(year)
		return result
	}

	let sortedExports = props.eports.sort((a, b) => a.time - b.time)

	let renderExports = sortedExports.map(
		(productExport, i) => 
			<tr key={productExport._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{productExport.productName}</td>
				<td className="text-center">{productExport.supplierName}</td>
				<td className="text-center">{productExport.amount}</td>
				<td className="text-center">{getDateFormat(productExport.time)}</td>
			</tr>
	)

	return (
		<div className="table-bound">
			<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
				<thead>
					<tr>
						<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
						<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
						<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
						<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
						<th className="text-center" scope="col" style={{width: "20%"}}>出庫日</th>
					</tr>	
				</thead>	
				<tbody>
					{renderExports}
				</tbody>
			</table>
		</div>
	)
}

export default Content