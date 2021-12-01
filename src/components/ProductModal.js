import React, { useState } from "react"

const ProductModal = (props) => {
	const [productName, setProductName] = useState('')
	const [supplierName, setSupplierName] = useState('')
	const [productQuantity, setProductQuantity] = useState(1)

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

	const handleCreateProduct = (e) => {
		e.preventDefault()
		console.log("Created new product")
	}
	return (
		<div className="modal fade bd-example-modal-lg" id={props.modalId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">新製品</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		        <form action="/products" method="POST">
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productNameInput1" style={{flex: "1", marginTop: "10px"}}>製品名</label>
		        		<input id="productNameInput1" value={productName} style={{flex: "5", marginTop: "5px"}} onChange={handleProductNameChange} type="text" className="form-control validate" placeholder="製品名" />
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="supplierNameInput2" style={{flex: "1", marginTop: "10px"}}>サプライヤー名</label>
		        		<input id="supplierNameInput2" style={{flex: "5", marginTop: "5px"}} value={supplierName} onChange={handleSupplierNameChange} type="text" className="form-control validate" placeholder="サプライヤー名" />
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productQuantityInput1" style={{flex: "1", marginTop: "10px"}}>製品数</label>
		        		<input id="productQuantityInput1" style={{flex: "5", marginTop: "5px"}} value={productQuantity} onChange={handleProductQuantityChange} type="number" min="1" max="10000" className="form-control validate" placeholder="製品数" />
		        	</div>
		        </form>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
		        <button type="submit" className="btn btn-primary" onClick={handleCreateProduct} >追加</button>
		      </div>
		    </div>
		  </div>
		</div>			
	)
}

export default ProductModal