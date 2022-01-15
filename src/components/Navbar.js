import React from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.js'
import './Navbar.css'

const Navbar = (props) => {
	const logout = () => {
      localStorage.clear()
      window.location.href = '/sign-in'
    }

    let renderNavbar = props.has_search ? <div id="myNavbar">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
				<form id="searchForm" className="form-inline"> 
    				<input className="form-control col-sm-6" type="search" value={props.search} onChange={props.handleSearchChange} placeholder={props.placeholder} aria-label="Search" />
  				</form>
			</div>
			<div className="col-sm-2"></div>
			<div id="avatar" className="col-sm-2 dropdown show">
				<a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    {props.user_email}
				</a>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
				    <a className="dropdown-item" href="/profile">プロフィール</a>
				    <a className="dropdown-item" href="/sign-in" onClick={logout}>ログアウト</a>
  				</div>
			</div>
		</div> : <div id="myNavbar">
			<div className="col-sm-1"></div>
			<div className="col-sm-7">
			</div>
			<div className="col-sm-2"></div>
			<div id="avatar" className="col-sm-2 dropdown show">
				<a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    {props.user_email}
				</a>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
				    <a className="dropdown-item" href="/profile">プロフィール</a>
				    <a className="dropdown-item" href="/sign-in" onClick={logout}>ログアウト</a>
  				</div>
			</div>
		</div>

	return (
		<div>
			{renderNavbar}
		</div>
	)
}

export default Navbar