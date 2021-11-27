import React, { useState } from 'react'
import { LocalStorageKeys } from '../apis/localStorageKeys'
import Logo from './Logo'
import Content from './Content'
import Menu from './Menu'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Homepage.css'

const Homepage = (props) => {
	let user = localStorage.getItem(LocalStorageKeys.UserInfo)
    // if (!user) {
    //     window.location.replace('/sign-in')
    // }
	return (
		<div id="homepage">
			<div className="col-sm-2">
				<Menu />
			</div>
			<div className="col-sm-10">
				<Content />
			</div>
		</div>
	)
}


export default Homepage