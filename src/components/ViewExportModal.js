import React from "react"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'

const ViewExportModal = (props) => {

    let productExport = props.productExport
    let warehouse = productExport.exportWarehouse;
    let renderWarehouse = warehouse.map(
        (product, i) => 
            <tr key={product._id}>
                <td className="text-center">{i+1}</td>
                <td className="text-center">{product.product.name}</td>
                <td className="text-center">{product.product.supplier.name}</td>
                <td className="text-center">{product.price.toString().concat(" ").concat(product.currency)}</td>
                <td className="text-center">{product.amount}</td>
            </tr>
    )

    const getDateFormat = (miliseconds) => {
		let date = new Date(miliseconds)
		let day = date.getDate().toString()
		let month = (date.getMonth()+1).toString()
		let year = date.getFullYear().toString()
		let result = day.concat("-").concat(month).concat("-").concat(year)
		return result
	}

    // Create styles
    const styles = StyleSheet.create({
        page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
        },
        section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
        }
    });

    let pdfProducts = warehouse.map(
        (product, i) => 
            <Text key={product._id}>
                {product.product.name}    {product.product.supplier.name}   {product.amount}
            </Text>
    )

    let totalMoney = 0
    for (let product of warehouse) {
        totalMoney += product.price * product.amount
    }

    let money = totalMoney.toString().concat(" ").concat(warehouse[0].currency)
    
    let document = <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Bill code: {productExport.code}</Text>
                <Text>Email: {productExport.email}</Text>
                <Text>Phone number: {productExport.phone}</Text>
                <Text>Export date: {getDateFormat(productExport.time)}</Text>
                <Text> </Text>
                <Text>Products list</Text>
                {pdfProducts}
                <Text> </Text>
                <Text>Total money: {money}</Text>
            </View>
        </Page>
    </Document>

    return (
        <div className="modal fade bd-example-modal-lg info-export" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">製品の輸出情報のリスト</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <table className="table table-striped table-bordered table-fixed" style={{width: "100%"}}>
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col" style={{width: "10%"}}>#</th>
                                    <th className="text-center" scope="col" style={{width: "20%"}}>製品名</th>
                                    <th className="text-center" scope="col" style={{width: "20%"}}>サプライヤー名</th>
                                    <th className="text-center" scope="col" style={{width: "20%"}}>単価</th>
                                    <th className="text-center" scope="col" style={{width: "10%"}}>数</th>
                                </tr>	
                            </thead>	
                            <tbody>
                                {renderWarehouse}
                                <tr>
                                    <td className="text-center" colspan="3"><b>合計金額</b></td>
                                    <td className="text-center" colspan="2">{money}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-footer">
                        <PDFButton document={document} />
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PDFButton = (props) => {
	return (
		<div>
            <PDFDownloadLink className="btn btn-success" document={props.document} fileName="Bill.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'PDFをエクスポート'
                }
            </PDFDownloadLink>
		</div>
	)
}

export default ViewExportModal