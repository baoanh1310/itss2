import React, { useState } from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.js'
import './Navbar.css'

const Navbar = (props) => {
	return (
		<div id="myNavbar">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
				<form id="searchForm" className="form-inline"> 
    				<input className="form-control col-sm-6" type="search" placeholder="製品を探す" aria-label="Search" />
					<button className="btn btn-outline-success col-sm-2" type="submit">探す</button>
  				</form>
			</div>
			<div className="col-sm-2"></div>
			<div id="avatar" className="col-sm-2 dropdown show">
				<a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    abc@gmail.com
				</a>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
				    <a class="dropdown-item" href="/profile">プロフィール</a>
  				</div>
			</div>
		</div>
	)
}

export default Navbar