import React, { useState, useEffect } from "react"
import SupplierService from "../apis/SupplierService";

const UpdateSupplierModal = (props) => {

    const [supplierName, setSupplierName] = useState('')
    const [supplierPhone, setSupplierPhone] = useState('')
    const [supplierAddress, setSupplierAddress] = useState('')
    let supplierID = props.supplier._id

    console.log("supplier ID: ", supplierID)

    // useEffect(() => {
    //     setSupplierName(props.supplier.name)
    //     setSupplierPhone(props.supplier.phoneNumber)
    //     setSupplierAddress(props.supplier.address)
    // })
    
    const handleUpdateSupplier = async (e) => {
		e.preventDefault()
        const data = {
			name : supplierName,
            phoneNumber: supplierPhone,
            address: supplierAddress
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

    const handleSupplierPhoneChange = (e) => {
        setSupplierPhone(e.target.value)
    }

    const handleSupplierAddressChange = (e) => {
        setSupplierAddress(e.target.value)
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
                        <input id="supplierInput5" style={{flex: "3", marginTop: "5px"}} value={supplierName} onChange={handleSupplierNameChange} type="text" className="form-control validate" placeholder="サプライヤー名" required />
                    </div>
                    <div className="form-group" style={{display: "flex"}}>
                        <label htmlFor="supplierPhoneInput1" style={{flex: "1", marginTop: "10px"}}>サプライヤー電話番号</label>
                        <input id="supplierPhoneInput1" style={{flex: "3", marginTop: "5px"}} value={supplierPhone} onChange={handleSupplierPhoneChange} type="text" className="form-control validate" placeholder="サプライヤー電話番号" />
                    </div>
                    <div className="form-group" style={{display: "flex"}}>
                        <label htmlFor="supplierAddressInput1" style={{flex: "1", marginTop: "10px"}}>サプライヤー住所</label>
                        <input id="supplierAddressInput1" style={{flex: "3", marginTop: "5px"}} value={supplierAddress} onChange={handleSupplierAddressChange} type="text" className="form-control validate" placeholder="サプライヤー住所" />
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