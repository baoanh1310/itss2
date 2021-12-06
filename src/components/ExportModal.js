import React, { useState } from "react"
import ExportService from "../apis/ExportService"

const ExportModal = (props) => {
	const [productName, setProductName] = useState('Milk')
	const [productQuantity, setProductQuantity] = useState(1)
	const [exportDate, setExportDate] = useState('')

	const handleProductNameChange = (e) => {
		setProductName(e.target.value)
	}

	const handleProductQuantityChange = (e) => {
		let quantity = parseInt(e.target.value)
		setProductQuantity(quantity)
	}

	const handleExportDateChange = (e) => {
		setExportDate(e.target.value)
	}

	const convertStringToDate = (str) => {
		let arr = str.split("-")
		let year = parseInt(arr[0])
		let month = parseInt(arr[1]) - 1
		let day = parseInt(arr[2])
		return new Date(year, month, day).getTime()
	}

	const handleCreateProductExport = async (e) => {
		e.preventDefault()
		const productId = props.products.filter(product => product.name === productName)[0]._id
		const data = {
			productId: productId,
			amount: productQuantity,
			time: convertStringToDate(exportDate)
		}
		const res = await ExportService.create(data)
		if (res.status === 201) {
			window.location.reload()
		}
	}

	let productOptions = props.products.map(
		(product, i) => 
			<option key={product._id} value={product.name}>
				{product.name}
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
		        <form action="/warehouse/export" method="POST">
					<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productNameInput20" style={{flex: "1", marginTop: "10px"}}>製品名</label>
		        		<select name="products" id="productNameInput20" 
								style={{flex: "5", marginTop: "5px"}} 
								className="form-control validate"
								onChange={handleProductNameChange} 
								value={productName}>
		        			{productOptions}
		        		</select>
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="productQuantityInput3" style={{flex: "1", marginTop: "10px"}}>製品数</label>
		        		<input id="productQuantityInput3" style={{flex: "5", marginTop: "5px"}} value={productQuantity} onChange={handleProductQuantityChange} type="number" min="1" max="10000" className="form-control validate" placeholder="製品数" />
		        	</div>
		        	<div className="form-group" style={{display: "flex"}}>
		        		<label htmlFor="exportDateInput" style={{flex: "1", marginTop: "10px"}}>出庫日</label>
		        		<input id="exportDateInput" style={{flex: "5", marginTop: "5px"}} value={exportDate} onChange={handleExportDateChange} type="date" className="form-control validate" placeholder="出庫日" />
		        	</div>
		        </form>
		      </div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
		        <button type="submit" className="btn btn-primary" onClick={handleCreateProductExport} >追加</button>
		      </div>
		    </div>
		  </div>
		</div>			
	)
}

export default ExportModal