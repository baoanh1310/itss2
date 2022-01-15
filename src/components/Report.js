import React, { useState } from "react"
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
				<td className="text-center">{i+1}</td>
				<td className="text-center">{product.name}</td>
				<td className="text-center">{product.supplierName}</td>
				<td className="text-center">{product.amount}</td>
			</tr>
	)

	let renderOutOfStock = outOfStock.map(
		(product, i) => 
			<tr key={product._id}>
				<td className="text-center">{i+1}</td>
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
				<td className="text-center">{i+1}</td>
				<td className="text-center">{productImport.productName}</td>
				<td className="text-center">{productImport.supplierName}</td>
				<td className="text-center">{productImport.amount}</td>
			</tr>
	)

    reportExports.sort((a, b) => a.time - b.time)

	let renderExports = reportExports.map(
		(productExport, i) => 
			<tr key={productExport._id}>
				<td className="text-center">{i+1}</td>
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

	// all in one
	const allInOneHeaders = [
		{ label: "ID", key: "ID"},
		{ label: "製品名", key: "productName" },
		{ label: "単位", key: "price" },
		{ label: "入庫数", key: "importAmount" },
		{ label: "出庫数", key: "exportAmount" },
		{ label: "在庫数", key: "remainAmount" }
	]

	let allInOne = props.products.map(product => {
		let rObj = {}
		rObj.ID = product._id
		rObj.productName = product.name
		rObj.price = product.price
		rObj.remainAmount = product.amount
		rObj.importAmount = 0
		rObj.exportAmount = 0
		return rObj
	})

	for (let obj of allInOne) {
		for (let obj1 of props.imports) {
			if (obj.ID === obj1.productId) {
				obj.importAmount += obj1.amount
			}
		}
		for (let obj2 of props.eports) {
			if (obj.ID === obj2.productId) {
				obj.exportAmount += obj2.amount
			}
		}
	}
	console.log("All in one: ", allInOne)
	allInOne.sort((a, b) => b.remainAmount - a.remainAmount)

	const allInOneData = [...allInOne]
	let renderAllInOne = allInOne.map(
		(product, i) => 
			<tr key={product.ID}>
				<td className="text-center">{i+1}</td>
				<td className="text-center">{product.ID}</td>
				<td className="text-center">{product.productName}</td>
				{/* <td className="text-center">{product.price}</td> */}
				<td className="text-center">{product.importAmount}</td>
				<td className="text-center">{product.exportAmount}</td>
				<td className="text-center">{product.remainAmount}</td>
			</tr>
	)

    return (
        <div>
        	<div style={{marginTop: "30px"}} id="#almostOutOfStock">
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

			<div style={{marginTop: "30px"}} id="#outOfStock">
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

			<div style={{marginTop: "30px"}}>
				<CSVButton data={allInOneData} headers={allInOneHeaders} filename={"AllInOne.xls"} />
            	<h5>{"輸入と輸出の概要"}</h5>
        	</div>
			
            <div style={{marginTop: "20px"}} className="table-bound-report">
                <table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
					<thead>
						<tr>
							<th className="text-center" scope="col" style={{width: "10%"}}>#</th>
							<th className="text-center" scope="col" style={{width: "10%"}}>ID</th>
							<th className="text-center" scope="col" style={{width: "20%"}}>製品名</th>
							{/*<th className="text-center" scope="col" style={{width: "15%"}}>単位</th>*/}
							<th className="text-center" scope="col" style={{width: "15%"}}>入庫数</th>
							<th className="text-center" scope="col" style={{width: "15%"}}>出庫数</th>
							<th className="text-center" scope="col" style={{width: "15%"}}>在庫数</th>
						</tr>	
					</thead>	
					<tbody>
						{renderAllInOne}
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