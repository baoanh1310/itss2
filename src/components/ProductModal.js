import React, { useState } from "react"
import ProductService from "../apis/ProductService";

const ProductModal = (props) => {

	const [productName, setProductName] = useState('')
	const [supplierName, setSupplierName] = useState("Vinamilk")
	const [supplierID, setSupplierID] = useState(0)

	let suppNameExactly = "Vinamilk"
	

	const handleSupplierNameChange = (e) => {

		setSupplierName(e.target.value)
		suppNameExactly = e.target.value

		console.log(suppNameExactly)
		var supplierTmp = props.suppliers.find(({name}) => name === suppNameExactly);
		console.log(supplierTmp)
		if(supplierTmp === null || supplierTmp === undefined){
			const supplier0 = props.suppliers.at(0)
			setSupplierID(supplier0._id)
		}else{
			setSupplierID(supplierTmp._id)
		}
	}


	const handleProductNameChange = (e) => {
		setProductName(e.target.value)
	}

	const handleCreateProduct = async (e) => {
		e.preventDefault()

		const product = {
			name : productName,
			supplierId : supplierID
		}
		console.log(product)

		if(supplierID === 0){
			const supplier0 = props.suppliers.at(0)
			product.supplierId = supplier0._id
		}
		console.log(product)

		// const res = await ProductService.create(product)

		await ProductService.create(product)
		.then(
			res => {
				console.log("Successfully!")
				alert("製品を正常に作成する!")
				setProductName("")
				window.location.reload()
			}
		).catch(
			err => {
				console.log("Failed!")
				alert("製品はすでに存在します!")
			}
		)

		// if (res.status == 201) {
			
        //     window.location.reload()
        // }
	}

	let options = props.suppliers.map(
		(supplier, i) => 
			<option key={supplier._id} value={supplier.name}>
				{supplier.name}
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
		        <form >
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productNameInput1" style={{flex: "1", marginTop: "10px"}}>製品名</label>
		        		<input id="productNameInput1" value={productName} style={{flex: "5", marginTop: "5px"}} onChange={handleProductNameChange} type="text" className="form-control validate" placeholder="製品名" />
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="supplierNameInput2" style={{flex: "1", marginTop: "10px"}}>サプライヤー名</label>
		        		{/* <input id="supplierNameInput2" style={{flex: "5", marginTop: "5px"}} value={supplierName} onChange={handleSupplierNameChange} type="text" className="form-control validate" placeholder="サプライヤー名" /> */}
		        		<select name="suppliers" id="supplierNameInput2" 
								style={{flex: "5", marginTop: "5px"}} 
								className="form-control validate"
								onChange={handleSupplierNameChange} 
								value={supplierName}>
		        			{options}
		        		</select>
						
		        	</div>
		        	{/*
					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productPriceInput1" style={{flex: "1", marginTop: "10px"}}>単価</label>
		        		<input id="productPriceInput1" style={{flex: "5", marginTop: "5px"}} value={price} onChange={handleProductPriceChange} type="number" min="1" max="10000000" className="form-control validate" placeholder="単価" />
		        	</div>
					*/}
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