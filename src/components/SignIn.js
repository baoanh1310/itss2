import React, { useState } from 'react'
import AuthenService from '../apis/AuthenServices'
import { LocalStorageKeys } from '../apis/localStorageKeys'
import './SignIn.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { endpoint } from '../apis/config'

import Logo from './Logo'

const SignIn = (props) => {

	const [isSignIn, setIsSignIn] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	console.log("Token: ", LocalStorageKeys.Token, " User: ", LocalStorageKeys.UserInfo)

	const handleLogin = async (e) => {
		e.preventDefault()
        const response = await AuthenService.login({
            email: email,
            password: password
        })
        
        if (response.status === 200) {
        	// console.log("Token: ", response.token, " User: ", response.user)
        	console.log("response: ", response)
            localStorage.setItem(LocalStorageKeys.Token, response.data.token)
            localStorage.setItem(LocalStorageKeys.UserInfo, response.data.user["_id"])
            window.location.replace('/')
        } 
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const changeSignInState = () => {
        setIsSignIn(!isSignIn)
    }


	return (
		<div className="sign-in">
			<div className="col-sm-4"></div>
			<div>
				<Logo />
				<form className="container col-sm-4 justify-content-center" style={{ marginTop: "15px" }}>
		            <h3 className="text-center">ログイン</h3>

		            <div className="form-group">
		                <label>メールアドレス</label>
		                <input type="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="メールアドレスを入力する" required />
		            </div>

		            <div className="form-group">
		                <label>パスワード</label>
		                <input type="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="パスワードを入力する" required />
		            </div>

		            <div className="form-group">
		                <div className="custom-control custom-checkbox">
		                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
		                    <label className="custom-control-label" htmlFor="customCheck1">情報を保存する？</label>
		                </div>
		            </div>

		            <button type="submit" onClick={handleLogin} className="btn btn-dark btn-lg btn-block">ログイン</button>
		            <p className="forgot-password text-center">
		                <a href="/forget">パスワードをお忘れですか？</a>
		            </p>
		        </form>
	        </div>
	        <div className="col-sm-4"></div>
        </div>
	)
}

export default SignIn