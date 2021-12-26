import React from "react"
import ExportBillService from "../apis/ExportBillService"

const ViewExportModal = (props) => {

    let productExport = props.productExport
    let exportID = productExport._id
    let code = productExport.code
    console.log("Export ID: ", exportID)
    
    const handleViewExportBill = async (e) => {
		e.preventDefault()
        
        const res = await ExportBillService.getProduct(exportID)
        
	}

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
                        {code}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewExportModal