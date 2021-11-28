import React, { useState } from "react"

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

	const handleCreateProductImport = (e) => {
		e.preventDefault()
		console.log("Created new product import")
	}
	return (
		<div className="modal fade" id={props.modalId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-centered" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">新製品</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		        <form action="/warehouse/import" method="POST">
		        	<input value={productName} onChange={handleProductNameChange} type="text" className="form-control validate" placeholder="製品名" />
		        	<input value={supplierName} onChange={handleSupplierNameChange} type="text" className="form-control validate" placeholder="サプライヤー名" />
		        	<input value={productQuantity} onChange={handleProductQuantityChange} type="number" min="1" max="10000" className="form-control validate" placeholder="製品数" />
		        	<input value={importDate} onChange={handleImportDateChange} type="date" className="form-control validate" placeholder="入庫日" />
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