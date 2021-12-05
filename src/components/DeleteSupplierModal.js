import React from "react"
import SupplierService from "../apis/SupplierService"

const DeleteSupplierModal = (props) => {

    let supplierID = props.supplier._id
    
    const handleDeleteSupplier = async (e) => {
		e.preventDefault()
        
        const res = await SupplierService.delSuppliers(supplierID)
        if (res.status === 200) {
            window.location.reload()
        }
	}

    return (
        <div className="modal fade bd-example-modal-lg delete-supplier" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">サプライヤー消去?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                        <button type="submit" className="btn btn-danger" onClick={handleDeleteSupplier} >消去</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteSupplierModal