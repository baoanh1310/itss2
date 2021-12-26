import React, { useState } from 'react'
import AuthenService from '../apis/AuthenServices'
import { LocalStorageKeys } from '../apis/localStorageKeys'
import './SignIn.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Box, Button, TextField } from '@mui/material'

import Logo from './Logo'

const SignIn = (props) => {

	const formik = useFormik({

		initialValues: {
			email: '',
			password: ''
		  },
		
		validationSchema: Yup.object({
		  email: Yup
			.string()
			.email(
			  '有効なメールアドレスである必要があります')
			.max(255)
			.required(
			  'メールが必要です'),
		  password: Yup
			.string()
			.max(255)
			.required(
			  'パスワードが必要です')
		})

	  })


	const handleLogin = async (e) => {
		e.preventDefault()
        const response = await AuthenService.login({
            email: formik.values.email,
            password: formik.values.password
        })

		console.log("Response: ", response)

        if (response.status === 200) {
            localStorage.setItem(LocalStorageKeys.Token, response.data.token)
            localStorage.setItem(LocalStorageKeys.UserInfo, response.data.user._id)
            localStorage.setItem(LocalStorageKeys.UserEmail, response.data.user.email)
            window.location.replace('/dashboard')
        } else if (response.status === 403) {
			alert("ログインに失敗しました")
		}
    }

	return (
		<div className="sign-in">
			<div>
				<div className="col-sm-4"></div>
				<div>
					<Logo />
					<form
					className="container col-sm-4 justify-content-center" style={{ marginTop: "15px" }}>
						
						<h3 className="text-center">ようこそ</h3>

						<div>
						<TextField
							error={Boolean(formik.touched.email && formik.errors.email)}
							fullWidth
							helperText={formik.touched.email && formik.errors.email}
							label="メールアドレス"
							margin="normal"
							name="email"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="email"
							value={formik.values.email}
							variant="outlined"
							/>
						<TextField
							error={Boolean(formik.touched.password && formik.errors.password)}
							fullWidth
							helperText={formik.touched.password && formik.errors.password}
							label="パスワード"
							margin="normal"
							name="password"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="password"
							value={formik.values.password}
							variant="outlined"
							/>

						<Box sx={{ py: 2 }}>
							<Button
								onClick={handleLogin}
								color="primary"
								disabled={formik.isSubmitting}
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
									ログイン
							</Button>
						</Box>
						<p className="forgot-password text-center">
							<a href="/forget">パスワードをお忘れですか？</a>
						</p> 
						</div>
					</form>
				</div>
				<div className="col-sm-4"></div>
			</div>
		</div>
	)
}

export default SignIn