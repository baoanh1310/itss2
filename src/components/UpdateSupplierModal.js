import React, { useState } from "react"
import SupplierService from "../apis/SupplierService";

const UpdateSupplierModal = (props) => {

    const [supplierName, setSupplierName] = useState(props.supplier.name)
    let supplierID = props.supplier._id
    
    const handleUpdateSupplier = async (e) => {
		e.preventDefault()
        const data = {
			name : supplierName
		}
        const res = await SupplierService.updateSupplier(supplierID, data)
        if (res.status === 200) {
            window.location.reload()
        }
	}

    const handleSupplierNameChange = (e) => {
        setSupplierName(e.target.value)
        // supplierName = e.target.value
	}

    return (
        <div className="modal fade bd-example-modal-lg update-supplier" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">サプライヤー編集</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="form-group" style={{display: "flex"}}>
                        <label htmlFor="supplierInput5" style={{flex: "1", marginTop: "10px"}}>サプライヤー名</label>
                        <input id="supplierInput5" style={{flex: "5", marginTop: "5px"}} value={supplierName} onChange={handleSupplierNameChange} type="text" className="form-control validate" placeholder="サプライヤー名" required />
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    <button type="submit" className="btn btn-primary" onClick={handleUpdateSupplier} >編集</button>
                </div>
            </div>
            </div>
        </div>	
    )
}

export default UpdateSupplierModal