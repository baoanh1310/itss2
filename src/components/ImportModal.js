import React, { useState } from "react"
import ImportService from "../apis/ImportService"

const ImportModal = (props) => {
	const [productName, setProductName] = useState('')
	const [supplierName, setSupplierName] = useState('')
	const [productQuantity, setProductQuantity] = useState(1)
	const [importDate, setImportDate] = useState('')

	const handleSupplierNameChange = (e) => {
		setSupplierName(e.target.value)
	}

	const handleProductNameChange = (e) => {
		setProductName(e.target.value)
	}

	const handleProductQuantityChange = (e) => {
		let quantity = parseInt(e.target.value)
		setProductQuantity(quantity)
	}

	const handleImportDateChange = (e) => {
		console.log(e.target.value)
		setImportDate(e.target.value)
	}

	const handleCreateProductImport = async (e) => {
		e.preventDefault()
		// console.log("Created new product import")
		const data = {
			
		}
		const res = await ImportService.create(data)
		if (res.status === 201) {
			window.location.reload()
		}
	}

	let supplierOptions = props.suppliers.map(
		(supplier, i) => 
			<option key={supplier._id} value={supplier.name}>
				{supplier.name}
			</option>
	)

	let productOptions = props.products.map(
		(product, i) => 
			<option key={product._id} value={product.name}>
				{product.name}
			</option>
	)

	return (
		<div className="modal fade bd-example-modal-lg" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">新製品</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		        <form action="/warehouse/import" method="POST">

					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productNameInput2" style={{flex: "1", marginTop: "10px"}}>製品名</label>
		        		<select name="productss" id="productNameInput2" 
								style={{flex: "5", marginTop: "5px"}} 
								className="form-control validate"
								onChange={handleProductNameChange} 
								value={productName}>
		        			{productOptions}
		        		</select>
		        	</div>
		        	
					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="supplierNameInput7" style={{flex: "1", marginTop: "10px"}}>サプライヤー名</label>
		        		<select name="suppliers" id="supplierNameInput7" 
								style={{flex: "5", marginTop: "5px"}} 
								className="form-control validate"
								onChange={handleSupplierNameChange} 
								value={supplierName}>
		        			{supplierOptions}
		        		</select>
		        	</div>

		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productQuantityInput2" style={{flex: "1", marginTop: "10px"}}>製品数</label>
		        		<input id="productQuantityInput2" style={{flex: "5", marginTop: "5px"}} value={productQuantity} onChange={handleProductQuantityChange} type="number" min="1" max="10000" className="form-control validate" placeholder="製品数" required/>
		        	</div>

		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="importDateInput" style={{flex: "1", marginTop: "10px"}}>入庫日</label>
		        		<input id="importDateInput" style={{flex: "5", marginTop: "5px"}} value={importDate} onChange={handleImportDateChange} type="date" className="form-control validate" placeholder="入庫日" required />
		        	</div>
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