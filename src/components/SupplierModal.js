import React, { useState } from "react"
import SupplierService from "../apis/SupplierService"

const SupplierModal = (props) => {

	const [supplierName, setSupplierName] = useState('')
	const [supplierPhone, setSupplierPhone] = useState('')
	const [supplierAddress, setSupplierAddress] = useState('')

	const handleSupplierNameChange = (e) => {
		setSupplierName(e.target.value)
	}

	const handleSupplierPhoneChange = (e) => {
		setSupplierPhone(e.target.value)
	}

	const handleSupplierAddressChange = (e) => {
		setSupplierAddress(e.target.value)
	}

	const handleCreateSupplier = async (e) => {
		e.preventDefault()
		let data = {
			"name": supplierName,
			"phoneNumber": supplierPhone,
			"address": supplierAddress
		}
		const res = await SupplierService.create(data)
		if (res.status == 201) {
			setSupplierName("")
			setSupplierPhone("")
			setSupplierAddress("")
            window.location.reload()
        }
	}

	return (
		<div className="modal fade bd-example-modal-lg" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">新サプライヤー</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		        <form action="/suppliers" method="POST">
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="supplierInput" style={{flex: "1", marginTop: "10px"}}>サプライヤー名</label>
		        		<input id="supplierInput" style={{flex: "3", marginTop: "5px"}} value={supplierName} onChange={handleSupplierNameChange} type="text" className="form-control validate" placeholder="サプライヤー名" />
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="supplierPhoneInput" style={{flex: "1", marginTop: "10px"}}>サプライヤー電話番号</label>
		        		<input id="supplierPhoneInput" style={{flex: "3", marginTop: "5px"}} value={supplierPhone} onChange={handleSupplierPhoneChange} type="text" className="form-control validate" placeholder="サプライヤー電話番号" />
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="supplierAddressInput" style={{flex: "1", marginTop: "10px"}}>サプライヤー住所</label>
		        		<input id="supplierAddressInput" style={{flex: "3", marginTop: "5px"}} value={supplierAddress} onChange={handleSupplierAddressChange} type="text" className="form-control validate" placeholder="サプライヤー住所" />
		        	</div>
		        </form>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
		        <button type="submit" className="btn btn-primary" onClick={handleCreateSupplier} >追加</button>
		      </div>
		    </div>
		  </div>
		</div>			
	)
}

export default SupplierModal