import React from "react"
import ProductService from "../apis/ProductService"

const DeleteProductModal = (props) => {

    let productID = props.product._id
    
    const handleDeleteProduct = async (e) => {
		e.preventDefault()
        
        const res = await ProductService.delProducts(productID)
        if (res.status === 200) {
            window.location.reload()
        }
	}

    return (
        <div className="modal fade bd-example-modal-lg delete-product" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">プロダクトー消去?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                        <button type="submit" className="btn btn-danger" onClick={handleDeleteProduct} >消去</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProductModal