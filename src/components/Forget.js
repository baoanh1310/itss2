import React, { useState } from "react"
import AuthenService from '../apis/AuthenServices'
import Logo from './Logo'


const Forget = (props) => {

	const [email, setEmail] = useState('')

	const handleChangeEmail = (value) => {
        setEmail(value)
    }

	const handleSubmit = async () => {
		console.log("Forget password")
		const response = await AuthenService.forgotPassword({
            email: email,
        })
        if (response.status === 200) {
            window.location.replace('/sign-in')
        } 
	}

	return (
		<div>
			<div className="col-sm-3"></div>
			<div>
				<Logo />
				<form className="container forget-form col-sm-6 justify-content-center">
		            <h3 className="text-center">パスワードを忘れたレポート</h3>
		            <div className="form-group" style={{marginTop: "30px"}}>
		                <label>メールアドレス</label>
		                <input type="email" onChange={(e) => handleChangeEmail(e.target.value)} className="form-control" placeholder="メールアドレスを入力する" required />
		            </div>
		            
		            <button type="submit" onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">参加する</button>
		        </form>
	        </div>
	        <div className="col-sm-3"></div>
		</div>
	)
}

export default Forget