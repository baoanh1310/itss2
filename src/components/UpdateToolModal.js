import React, { useState, useEffect } from "react"
import ToolService from "../apis/ToolService"

const UpdateToolModal = (props) => {

    const [name, setName] = useState('')
	const [amount, setAmount] = useState('')
	const [time, setTime] = useState('')

    // useEffect(() => {
    //     setName(props.tool.name)
    //     setAmount(props.tool.amount)
    // })

	const handleToolNameChange = (e) => {
		setName(e.target.value)
	}

	const handleAmountChange = (e) => {
		let quantity = parseInt(e.target.value)
		setAmount(quantity)
	}

	const handleTimeChange = (e) => {
		setTime(e.target.value)
	}

    const convertStringToDate = (str) => {
		let arr = str.split("-")
		let year = parseInt(arr[0])
		let month = parseInt(arr[1]) - 1
		let day = parseInt(arr[2])
		return new Date(year, month, day).getTime()
	}

    let toolId = props.tool._id

    const handleUpdateTool = async (e) => {
        e.preventDefault()
        let data = {
			"name": name,
			"amount": amount,
			"time": convertStringToDate(time)
		}

        await ToolService.updateTool(toolId, data)
        .then(res => {
            if (res.status == 200) {
                window.location.reload()
            }
        })
        .catch(err => {
            alert("Update tool failed")
        })
    }

    return (
        <div className="modal fade bd-example-modal-lg update-tool" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">用品編集</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group" style={{display: "flex"}}>
                            <label htmlFor="toolNameInput" style={{flex: "1", marginTop: "10px"}}>用品名</label>
                            <input id="toolNameInput" style={{flex: "3", marginTop: "5px"}} value={name} onChange={handleToolNameChange} type="text" className="form-control validate" placeholder="用品名" required />
                        </div>
                        <div className="form-group" style={{display: "flex"}}>
                            <label htmlFor="toolAmountInput" style={{flex: "1", marginTop: "10px"}}>用品数</label>
                            <input id="toolAmountInput" style={{flex: "3", marginTop: "5px"}} value={amount} onChange={handleAmountChange} type="number" min="1" max="100" className="form-control validate" placeholder="用品数" required />
                        </div>
                        <div className="form-group" style={{display: "flex"}}>
                            <label htmlFor="toolDateInput" style={{flex: "1", marginTop: "10px"}}>入庫日</label>
                            <input id="toolDateInput" style={{flex: "3", marginTop: "5px"}} value={time} onChange={handleTimeChange} type="date" className="form-control validate" placeholder="入庫日" required />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">キャンセル</button>
                    <button type="submit" className="btn btn-primary" onClick={handleUpdateTool} >編集</button>
                </div>
                </div>
            </div>
        </div>	
    )
}

export default UpdateToolModal