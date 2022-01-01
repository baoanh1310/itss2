import React, { useState } from "react"
import ProductService from "../apis/ProductService";

const UpdateProduct = (props) => {

    let productID = props.product._id
    let productName = props.product.name
    let supplierName = props.product.supplierName
    let supplierID = props.product.supplierId
    let price = props.product.price
    
    const handleUpdateProduct = async (e) => {
		e.preventDefault()
        
        const product = {
			name : productName,
			supplierId : supplierID
		}

	 	
        const res = await ProductService.updateProduct(productID, product)
        console.log("Response: ", res)

		if (res.status == 200) {
            window.location.reload()
        }
	}

    const handleProductNameChange = (e) => {
        productName = e.target.value
	}

    const handleProductPriceChange = (e) => {
        price = e.target.value
    }

    return (
        <>
        <div className="modal fade update-product" tabIndex="-1" role="dialog"
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
                            {/*
                            <div className="form-group" style={{ display: "flex" }}>
                                <label htmlFor="priceInput2" style={{ flex: "1", marginTop: "10px" }}>単価</label>
                                <input 
                                    id="priceInput2" 
                                    style={{ flex: "5", marginTop: "5px" }} 
                                    type="text" className="form-control validate" 
                                    defaultValue={price} 
                                    onChange={handleProductPriceChange}
                                />
                            </div>
                            */}
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