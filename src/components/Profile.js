import React, { useState } from "react"
import { LocalStorageKeys } from '../apis/localStorageKeys'
import AuthenServices from "../apis/AuthenServices"

const Profile = (props) => {

	let user = localStorage.getItem(LocalStorageKeys.UserInfo)
	let user_email = localStorage.getItem(LocalStorageKeys.UserEmail)

	const [password, setPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	const handleNewPasswordChange = (e) => {
		setNewPassword(e.target.value)
	}

	const handleChangePassword = async (e) => {
		e.preventDefault()
		const data = {
			"oldPassword": password,
			"newPassword": newPassword
		}
		const res = await AuthenServices.resetPassword(data)
		console.log("response: ", res)
		if (res.status === 200) {
			console.log(res.data.message)
			setPassword("")
			setNewPassword("")
		}
	}

	return (
		<div>
			<div style={{display: "flex"}}>
				<div className="col-sm-1"></div>
				<div className="card col-sm-10" style={{marginTop: "20px"}}>
					<div className="card-body">
						<h3 className="card-title">ユーザー情報</h3>
						<div style={{display: "flex", marginTop: "25px"}}>
							<h5>メール：</h5>
							<h5>{user_email}</h5>
						</div>
					</div>
				</div>
				<div className="col-sm-1"></div>
			</div>
			<div style={{display: "flex", marginTop: "20px"}}>
				<div className="col-sm-1"></div>
				<div className="card col-sm-10">
					<div className="card-body">
						<form>
							<div className="form-group" style={{display: "flex"}}>
								<label htmlFor="rawpassword" style={{flex: "1", marginTop: "10px"}}>以前のパスワード</label>
								<input id="rawpassword" style={{flex: "5", marginTop: "5px"}} value={password} onChange={handlePasswordChange} type="text" className="form-control validate" placeholder="以前のパスワード" required />
							</div>
							<div className="form-group" style={{display: "flex"}}>
								<label htmlFor="newpassword" style={{flex: "1", marginTop: "10px"}}>新しいパスワード</label>
								<input id="newpassword" style={{flex: "5", marginTop: "5px"}} value={newPassword} onChange={handleNewPasswordChange} type="text" className="form-control validate" placeholder="新しいパスワード" required />
							</div>
							<div className="form-group" style={{display: "flex", marginTop: "20px"}}>
								<button type="submit" className="btn btn-warning" onClick={handleChangePassword} >パスワードを変更する</button>
							</div>
						</form>
					</div>
				</div>
				<div className="col-sm-1"></div>
			</div>
			
		</div>
		

		
	)
}

export default Profile