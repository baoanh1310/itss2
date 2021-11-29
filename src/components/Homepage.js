import React, { useState } from 'react'
import { LocalStorageKeys } from '../apis/localStorageKeys'
import Content from './Content'
import Navbar from './Navbar'
import Menu from './Menu'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Homepage.css'

const Homepage = (props) => {
	let user = localStorage.getItem(LocalStorageKeys.UserInfo)
	console.log("User: ", user)
	console.log("LocalStorageKeys: ", LocalStorageKeys)
	console.log("localstorage: ", localStorage)
    if (!user) {
        window.location.replace('/sign-in')
    }
	return (
		<div id="homepage">
			<div className="col-sm-2">
				<Menu />
			</div>
			<div className="col-sm-10">
				<div>
					<Navbar />
					<Content {...props} />
				</div>
			</div>
		</div>
	)
}


export default Homepage