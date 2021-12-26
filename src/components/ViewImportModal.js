import React from "react"
import ImportBillService from "../apis/ImportBillService"

const ViewImportModal = (props) => {

    let productImport = props.productImport
    let importID = productImport._id
    let code = productImport.code
    console.log("Import ID: ", importID)
    
    const handleViewImportBill = async (e) => {
		e.preventDefault()
        
        const res = await ImportBillService.getProduct(importID)
        
	}

    return (
        <div className="modal fade bd-example-modal-lg info-import" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">製品の輸入情報のリスト</h5>
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

export default ViewImportModal