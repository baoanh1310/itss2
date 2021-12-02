import React, { useState, Component } from "react"
import ProductService from "../apis/ProductService";

const UpdateProduct = (props) => {


    
    console.log("Update1")
    console.log(props.product)
    // let [supplierID, setSupplierID] = useState(props.product._id)
    // let [productName, setProductName] = useState(props.product.name)
    let productID = props.product._id
    let productName = props.product.name
    let supplierName = props.product.supplierName
    let supplierID = props.product.supplierId
	// let [supplierName, setSupplierName] = useState(props.product.supplierName)
    console.log("Update2")
    console.log(productName)
    
    const handleUpdateProduct = (e) => {
		e.preventDefault()
		console.log("Update the product")
        
        // setSupplierID(props.product.supplierId)
        // setProductName(props.product.name)
        // setSupplierName(props.product.supplierName)
        console.log("handleUpdateProduct")
        console.log(productName)
        
        
        const product = {
			name : productName,
			supplier : supplierID
		}

        console.log(product)
        console.log(productID)
	 	ProductService.updateProduct(productID,product)
	}

    const handleProductNameChange = (e) => {
		// setProductName(e.target.value)
        productName = e.target.value
	}

    return (
        <>
        <div class="modal fade update" tabindex="-1" role="dialog"
					aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
					<div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">編集</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="form-group" style={{ display: "flex" }}>
                                <label htmlFor="productNameInput1" style={{ flex: "1", marginTop: "10px" }}>製品名</label>
                                <input 
                                id="productNameInput1" 
                                style={{ flex: "5", marginTop: "5px" }} 
                                type="text" className="form-control validate" 
                                defaultValue={productName} 
                                onChange={handleProductNameChange}
                                />
                            </div>
                            <div className="form-group" style={{ display: "flex" }}>
                                <label htmlFor="supplierNameInput2" style={{ flex: "1", marginTop: "10px" }}>サプライヤー名</label>
                                <h4 style={{ flex: "5", marginTop: "5px" }}>{supplierName}</h4>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                        <button type="submit" className="btn btn-primary" onClick={handleUpdateProduct}>編集</button>
                    </div>
					</div>
                </div>
                </div>
        </>
    )
}

export default UpdateProduct