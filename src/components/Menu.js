import React, { useState } from "react"
import './Menu.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Menu = (props) => {
	const itemList = [
		{
			id: 1,
			itemName: "ダッシュボード",
			href: "/dashboard"
		},
		{
			id: 2,
			itemName: "サプライヤー",
			href: "/supplier"
		},
		{
			id: 3,
			itemName: "製品管理",
			href: "/product"
		},
		{
			id: 4,
			itemName: "輸入管理",
			href: "/import"
		},
		{
			id: 5,
			itemName: "輸出管理",
			href: "/export"
		},
		{
			id: 6,
			itemName: "レポート",
			href: "/report"
		}, 
		{
			id: 7,
			itemName: "倉庫用品",
			href: "/tools"
		}
	]

	const renderItems = itemList.map(item => <MenuItem key={item.id} href={item.href} itemName={item.itemName} />)

	const logout = () => {
      localStorage.clear()
      window.location.href = '/sign-in'
    }

	return (
		<div id="menu">
			<img src="/logo.png" alt="logo" id="menuLogo" />
			{renderItems}
			{/*<button id="signOutBtn" onClick={logout} type="button" className="btn btn-secondary">ログアウト</button>*/}
		</div>
	)
}

const MenuItem = (props) => {


	const onClick = () => {
		window.location.replace(props.href)
	}


	return (
		<button className="menu-item" onClick={onClick} style={{borderTop: "none"}}>
			<a href={props.href} style={{textDecoration: "none"}}><span className="menu-item-label">{props.itemName}</span></a>
		</button>
	)
	
}

export default Menu