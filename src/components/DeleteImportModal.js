import React from "react"
import ImportService from "../apis/ImportService"

const DeleteImportModal = (props) => {

    let importID = props.productImport._id
    console.log("Import ID: ", importID)
    
    const handleDeleteImport = async (e) => {
		e.preventDefault()
        
        const res = await ImportService.delProducts(importID)
        if (res.status === 200) {
            window.location.reload()
        }
	}

    return (
        <div className="modal fade bd-example-modal-lg delete-import" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">入庫情報消去?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                        <button type="submit" className="btn btn-danger" onClick={handleDeleteImport} >消去</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteImportModal