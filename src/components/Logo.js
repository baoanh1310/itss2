import React from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Logo.css'

const Logo = (props) => {
	return (
		<div className="justify-content-center" id="logo">
			<img src="/logo.png" className=".img-fluid" alt="logo" />
		</div>
	)
}

export default Logo