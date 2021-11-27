import React, { useState } from 'react'
import AuthenService from '../apis/AuthenServices'
import { LocalStorageKeys } from '../apis/localStorageKeys'
import './SignIn.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import Logo from './Logo'

const SignIn = (props) => {

	const [isSignIn, setIsSignIn] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async () => {
        const response = await AuthenService.login({
            email: email,
            password: password
        });
        if (response.status === 200) {
            localStorage.setItem(LocalStorageKeys.Token, response.data.accessToken)
            localStorage.setItem(LocalStorageKeys.UserInfo, response.data.user.userid)
            window.location.replace('/')
        } 
    }

    const handleChangeEmail = (value) => {
        setEmail(value)
    }

    const handleChangePassword = (value) => {
        setPassword(value)
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
		                <input type="email" onChange={(e) => handleChangeEmail(e.target.value)} className="form-control" placeholder="メールアドレスを入力する" required />
		            </div>

		            <div className="form-group">
		                <label>パスワード</label>
		                <input type="password" onChange={(e) => handleChangePassword(e.target.value)} className="form-control" placeholder="パスワードを入力する" required />
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