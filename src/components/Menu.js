import React, { useState } from "react"
import './Menu.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Logo from './Logo'

const Menu = (props) => {
	const itemList = [
		{
			id: 1,
			itemName: "ダッシュボード",
			href: "/"
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
		}
	]

	const renderItems = itemList.map(item => <MenuItem key={item.id} href={item.href} itemName={item.itemName} />)

	return (
		<div id="menu">
			<img src="/logo.png" alt="logo" id="menuLogo" />
			{renderItems}
			<button id="signOutBtn" type="button" class="btn btn-secondary">ログアウト</button>
		</div>
	)
}

const MenuItem = (props) => {
	return (
		<div className="menu-item">
			<a href={props.href} style={{textDecoration: "none"}}><span className="menu-item-label">{props.itemName}</span></a>
		</div>
	)
}

export default Menu