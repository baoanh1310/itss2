import React, { useState, useEffect } from "react"
import { CSVLink } from 'react-csv'

const Report = (props) => {

	let localImports = props.imports
	let localExports = props.eports

    const [toggleImport, setToggleImport] = useState(0)
    const [toggleExport, setToggleExport] = useState(0)
	const [reportImports, setReportImports] = useState(localImports)
	const [reportExports, setReportExports] = useState(localExports)

	let importArr = [props.imports, props.lastMonthImport, props.lastWeekImport]
	let exportArr = [props.eports, props.lastMonthExport, props.lastWeekExport]
	
    const getDateFormat = (miliseconds) => {
		let date = new Date(miliseconds)
		let day = date.getDate().toString()
		let month = (date.getMonth()+1).toString()
		let year = date.getFullYear().toString()
		let result = day.concat("-").concat(month).concat("-").concat(year)
		return result
	}

	let outOfStock = props.products.filter(product => product.amount < 10)

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

	console.log("Report imports: ", reportImports)
	console.log("Report exports: ", reportExports)

    reportImports.sort((a, b) => a.time - b.time)

	let renderImports = reportImports.map(
		(productImport, i) => 
			<tr key={productImport._id}>
				<th className="text-center" scope="row">{i+1}</th>
				<td className="text-center">{productImport.productName}</td>
				<td className="text-center">{productImport.supplierName}</td>
				<td className="text-center">{productImport.amount}</td>
				<td className="text-center">{getDateFormat(productImport.time)}</td>
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
				<td className="text-center">{getDateFormat(productExport.time)}</td>
			</tr>
	)

	const outOfStockData = []
	const outOfStockHeaders = []
	const importData = []
	const importHeaders = []
	const exportData = []
	const exportHeaders = []

    return (
        <div>
            <div style={{marginTop: "20px"}} className="table-bound-report">
				<CSVButton data={outOfStockData} headers={outOfStockHeaders} filename={"OutOfStock.csv"} />
                <h5>{"商品の在庫がなくなりそうです".concat("(<10)")}</h5>
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

			<div style={{display: "flex", marginTop: "10px"}}>
				
				<h5>輸入</h5>
				<select value={toggleImport} onChange={onToggleImportChange} style={{width: "100px", marginLeft: "20px"}} className="custom-select custom-select-sm">
					<option value="0">全て</option>
					<option value="1">先月</option>
					<option value="2">先週</option>
				</select>
			</div>
            <div style={{marginTop: "20px"}} className="table-bound-report">
				<CSVButton data={importData} headers={importHeaders} filename={"Import.csv"} />
				<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
							<th className="text-center" scope="col" style={{width: "20%"}}>入庫日</th>
						</tr>	
					</thead>	
					<tbody>
						{renderImports}
					</tbody>
				</table>
            </div>

			<div style={{display: "flex", marginTop: "20px"}}>
				<h5>輸出</h5>
				<select value={toggleExport} onChange={onToggleExportChange} style={{width: "100px", marginLeft: "20px"}} className="custom-select custom-select-sm">
					<option value="0">全て</option>
					<option value="1">先月</option>
					<option value="2">先週</option>
				</select>
			</div>
			<div style={{marginTop: "20px"}} className="table-bound-report">
				<CSVButton data={exportData} headers={exportHeaders} filename={"Export.csv"} />
				<table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>製品名</th>
							<th className="text-center" scope="col" style={{width: "25%"}}>サプライヤー名</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>数</th>
							<th className="text-center" scope="col" style={{width: "20%"}}>入庫日</th>
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
			<CSVLink className="btn btn-success" filename={props.filename} headers={props.headers} data={props.data} style={{float: "right", marginBottom: "5px"}}>CSVをエクスポート</CSVLink>
		</div>
	)
}

export default Report