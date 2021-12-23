import { data } from "jquery"
import React, { useState, useEffect } from "react"
import { CSVLink } from 'react-csv'

const Report = (props) => {

	let localImports = props.imports
	let localExports = props.eports

    const [toggleImport, setToggleImport] = useState(0)
    const [toggleExport, setToggleExport] = useState(0)
	const [reportImports, setReportImports] = useState(localImports)
	const [reportExports, setReportExports] = useState(localExports)

	let importArr = [props.lastMonthImport, props.lastWeekImport]
	let exportArr = [props.lastMonthExport, props.lastWeekExport]

    const getDateFormat = (miliseconds) => {
		let date = new Date(miliseconds)
		let day = date.getDate().toString()
		let month = (date.getMonth()+1).toString()
		let year = date.getFullYear().toString()
		let result = day.concat("-").concat(month).concat("-").concat(year)
		return result
	}

	let almostOutOfStock = props.products.filter(product => product.amount < 10 && product.amount > 0)
	let outOfStock = props.products.filter(product => product.amount === 0)

    let renderAlmostOutOfStock = almostOutOfStock.map(
		(product, i) => 
			<tr key={product._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{product.name}</td>
				<td className="text-center">{product.supplierName}</td>
				<td className="text-center">{product.amount}</td>
			</tr>
	)

	let renderOutOfStock = outOfStock.map(
		(product, i) => 
			<tr key={product._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{product.name}</td>
				<td className="text-center">{product.supplierName}</td>
				<td className="text-center">{product.amount}</td>
			</tr>
	)

	const onToggleImportChange = (e) => {
		setToggleImport(e.target.value)
		let index = parseInt(e.target.value)
		setReportImports(importArr[index])
	}

	const onToggleExportChange = (e) => {
		setToggleExport(e.target.value)
		let index = parseInt(e.target.value)
		setReportExports(exportArr[index])
	}

	// console.log("toggleImport: ", toggleImport)
	// console.log("Report exports: ", reportExports)

    reportImports.sort((a, b) => a.time - b.time)

	let renderImports = reportImports.map(
		(productImport, i) => 
			<tr key={productImport._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{productImport.productName}</td>
				<td className="text-center">{productImport.supplierName}</td>
				<td className="text-center">{productImport.amount}</td>
			</tr>
	)

    reportExports.sort((a, b) => a.time - b.time)

	let renderExports = reportExports.map(
		(productExport, i) => 
			<tr key={productExport._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{productExport.productName}</td>
				<td className="text-center">{productExport.supplierName}</td>
				<td className="text-center">{productExport.amount}</td>
			</tr>
	)

	const almostOutOfStockHeaders = [
		{ label: "製品名", key: "name" },
		{ label: "サプライヤー名", key: "supplierName" },
		{ label: "数", key: "amount" }
	]
	let almostOutOfStockData = [...almostOutOfStock]

	const outOfStockHeaders = [
		{ label: "製品名", key: "name" },
		{ label: "サプライヤー名", key: "supplierName" },
		{ label: "数", key: "amount" }
	]
	let outOfStockData = [...outOfStock]

	const importHeaders = [
		{ label: "製品名", key: "productName" },
		{ label: "サプライヤー名", key: "supplierName" },
		{ label: "数", key: "amount" }
	]
	let importData = [...reportImports]
	for (let data of importData) {
		data.date = getDateFormat(data.time)
	}

	const exportHeaders = [
		{ label: "製品名", key: "productName" },
		{ label: "サプライヤー名", key: "supplierName" },
		{ label: "数", key: "amount" }
	]
	const exportData = [...reportExports]
	for (let data of exportData) {
		data.date = getDateFormat(data.time)
	}

    return (
        <div>
        	<div style={{marginTop: "30px"}}>
				<CSVButton data={almostOutOfStockData} headers={almostOutOfStockHeaders} filename={"AlmostOutOfStock.xls"} />
            	<h5>{"商品の在庫がなくなりそうです"}</h5>
        	</div>
			
            <div style={{marginTop: "20px"}} className="table-bound-report">
                <table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "30%"}}>製品名</th>
							<th className="text-center" scope="col" style={{width: "30%"}}>サプライヤー名</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
						</tr>	
					</thead>	
					<tbody>
						{renderAlmostOutOfStock}
					</tbody>
				</table>
            </div>

			<div style={{marginTop: "30px"}}>
				<CSVButton data={outOfStockData} headers={outOfStockHeaders} filename={"OutOfStock.xls"} />
            	<h5>{"商品数量が在庫切れ"}</h5>
        	</div>
			
            <div style={{marginTop: "20px"}} className="table-bound-report">
                <table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "30%"}}>製品名</th>
							<th className="text-center" scope="col" style={{width: "30%"}}>サプライヤー名</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
						</tr>	
					</thead>	
					<tbody>
						{renderOutOfStock}
					</tbody>
				</table>
            </div>

			<div style={{display: "flex", marginTop: "20px"}}>
				
				<h5>輸入</h5>
				<select value={toggleImport} onChange={onToggleImportChange} style={{width: "100px", marginLeft: "20px"}} className="custom-select custom-select-sm">
					<option value="0">先月</option>
					<option value="1">先週</option>
				</select>
			</div>

			<CSVButton data={importData} headers={importHeaders} filename={"Import.xls"} />
            <div style={{marginTop: "20px"}} className="table-bound-report">
				<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
						</tr>	
					</thead>	
					<tbody>
						{renderImports}
					</tbody>
				</table>
            </div>

			<div style={{display: "flex", marginTop: "40px"}}>
				<h5>輸出</h5>
				<select value={toggleExport} onChange={onToggleExportChange} style={{width: "100px", marginLeft: "20px"}} className="custom-select custom-select-sm">
					<option value="0">先月</option>
					<option value="1">先週</option>
				</select>
			</div>
			<CSVButton data={exportData} headers={exportHeaders} filename={"Export.xls"} />
			<div style={{marginTop: "20px"}} className="table-bound-report">
				<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
						</tr>	
					</thead>	
					<tbody>
						{renderExports}
					</tbody>
				</table>
			</div>
        </div>
    )
}

const CSVButton = (props) => {
	return (
		<div>
			<CSVLink className="btn btn-success" filename={props.filename} headers={props.headers} data={props.data} style={{float: "right", marginBottom: "5px"}}>Excelをエクスポート</CSVLink>
		</div>
	)
}

export default Report