import React, { useState } from "react"
import ImportBillService from "../apis/ImportBillService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ImportModal = (props) => {

	const [billCode, setBillCode] = useState("")
	const [supplierName, setSupplierName] = useState("")
	const [productName, setProductName] = useState("")
	const [productQuantity, setProductQuantity] = useState(1)
	const [importDate, setImportDate] = useState('')
	const [price, setPrice] = useState(1)
	const [filteredProducts, setFilteredProducts] = useState([])
	const [currency,setCurrency] = useState("")
	
	const [dataArr, setDataArr] = useState([])

	console.log("Product name: ", productName)
	console.log("Date: ", importDate)
	console.log("Amount: ", productQuantity)

	const handleProductNameChange = (e) => {
		setProductName(e.target.value)
	}

	const handleSupplierNameChange = (e) => {
		setSupplierName(e.target.value)
		let filteredProducts = props.products.filter(product => product.supplierName === e.target.value)
		setFilteredProducts(filteredProducts)
	}

	const handleBillCodeChange = (e) => {
		setBillCode(e.target.value)
	}

	const handleProductPriceChange = (e) => {
		let price = parseInt(e.target.value)
		setPrice(price)
	}

	const handleCurrency = (e) => {
		console.log(e.target.value)
		setCurrency(e.target.value)
	}

	const handleProductQuantityChange = (e) => {
		let quantity = parseInt(e.target.value)
		setProductQuantity(quantity)
	}

	const handleImportDateChange = (e) => {
		console.log(e.target.value)
		setImportDate(e.target.value)
	}

	const convertStringToDate = (str) => {
		let arr = str.split("-")
		let year = parseInt(arr[0])
		let month = parseInt(arr[1]) - 1
		let day = parseInt(arr[2])
		return new Date(year, month, day).getTime()
	}

	const handleCreateProductImport = async (e) => {
		e.preventDefault()
		// console.log("Created new product import")
		const supplierId = props.suppliers.filter(supplier => supplier.name === supplierName)[0]._id
		const productId = props.products.filter(product => product.name === productName)[0]._id
		console.log("ProductID: ", productId)
		console.log("SupplierID: ", supplierId)
		let data = []
		let productObj = {
			"productId": productId,
			"amount": productQuantity,
			"price": price,
			"currency": currency
		}
		data.push(productObj)
		const req = {
			code: billCode,
			time: convertStringToDate(importDate),
			supplierId: supplierId,
			data: data
		}
		console.log(req.data)
		await ImportBillService.create(req)
			.then(res => {
				if (res.status == 201) {
					window.location.reload()
				}
			})
			.catch(err => {
				console.log(err)
				alert("Create new bill error")
			})
	}

	const handleCreateNewSubForm = (e) => {
		e.preventDefault()
		let form = document.getElementById("mainForm")
		form.appendChild(productSubForm)
	}


	let supplierOptions = props.suppliers.map(
		(supplier, i) => 
			<option key={supplier._id} value={supplier.name}>
				{supplier.name}
			</option>
	)

	let productOptions = filteredProducts.map(
		(product, i) => 
			<option key={product._id} value={product.name}>
				{product.name}
			</option>
	)

	let currencies = ['円','VND','USD','ERR']

	let currencyOptions = currencies.map(
		(currency, i) => 
			<option key={i} value={currency}>
				{currency}
			</option>
	)

	let productSubForm = <div>
		<hr></hr>
		<div className="form-group" style={{display: "flex"}}>
			<label htmlFor="productNameInput21" style={{flex: "1", marginTop: "10px"}}>製品名</label>
			<select name="products" id="productNameInput21" 
					style={{flex: "5", marginTop: "5px"}} 
					className="form-control validate"
					onChange={handleProductNameChange} 
					value={productName}>
				{productOptions}
			</select>
		</div>
		
		<div className="form-group" style={{display: "flex"}}>
			<label htmlFor="productQuantityInput2" style={{flex: "1", marginTop: "10px"}}>製品数</label>
			<input id="productQuantityInput2" style={{flex: "5", marginTop: "5px"}} value={productQuantity} onChange={handleProductQuantityChange} type="number" min="1" max="10000" className="form-control validate" placeholder="製品数" required/>
		</div>

		<div className="form-group" style={{display: "flex"}}>
			<label htmlFor="productPriceInput3" style={{flex: "1", marginTop: "10px"}}>単価</label>
			<input id="productPriceInput3" style={{flex: "4.5", marginTop: "5px"}} value={price} onChange={handleProductPriceChange} type="number" min="1" max="10000000" className="form-control validate" placeholder="単価" />
			<select name="currencies" id="currency" 
					style={{flex: "0.5", marginTop: "5px"}} 
					className="form-control validate"
					onChange={handleCurrency} 
					value={currency}>
				{currencyOptions}
			</select>
		</div>

		<div id="newSubFormBtn" style={{display: "flex"}}>
			<button style={{margin: "auto"}}>
				<FontAwesomeIcon icon={faPlus} />
			</button>
		</div>
	</div>

	return (
		<div className="modal fade bd-example-modal-lg" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">新明細書</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		        <form id="mainForm">

					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="billCodeInput" style={{flex: "1", marginTop: "10px"}}>請求書コード</label>
		        		<input id="billCodeInput" style={{flex: "5", marginTop: "5px"}} value={billCode} onChange={handleBillCodeChange} type="text" className="form-control validate" placeholder="請求書コード" required/>
		        	</div>

					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="importDateInput" style={{flex: "1", marginTop: "10px"}}>入庫日</label>
		        		<input id="importDateInput" style={{flex: "5", marginTop: "5px"}} value={importDate} onChange={handleImportDateChange} type="date" className="form-control validate" placeholder="入庫日" required />
		        	</div>

					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="suppliertNameInput22" style={{flex: "1", marginTop: "10px"}}>サプライヤー名</label>
		        		<select name="suppliers" id="suppliertNameInput22" 
								style={{flex: "5", marginTop: "5px"}} 
								className="form-control validate"
								onChange={handleSupplierNameChange} 
								value={supplierName}>
		        			{supplierOptions}
		        		</select>
		        	</div>

					{productSubForm}

		        </form>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
		        <button type="submit" className="btn btn-primary" onClick={handleCreateProductImport} >追加</button>
		      </div>
		    </div>
		  </div>
		</div>			
	)
}

export default ImportModal