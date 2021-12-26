import React, { useState } from "react"
import './Menu.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const NewMenu = (props) => {

    const handleClick = (e) => {
        e.stopPropagation()
    }

    let selectedItem = props.selected
    let dashboard_className = selectedItem === "dashboard" ? "menu-item-disabled menu-item-selected" : "menu-item-disabled"
    let supplier_className = selectedItem === "supplier" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    let product_className = selectedItem === "product" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    let import_className = selectedItem === "import" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    let export_className = selectedItem === "export" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    let report_className = selectedItem === "report" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    let tool_className = selectedItem === "tools" ? "menu-item-disabled menu-item-selected" : "menu-item-disabled"

    return (
        <div id="menu">
            <img src="/logo.png" alt="logo" id="menuLogo" />
            <div className="menu-list">

                <a onClick={handleClick} className={dashboard_className} href="/dashboard">
                    <div>
                        <span className="menu-item-label">ダッシュボード</span>
                    </div>
                </a>

                <a className="menu-item-disabled" style={{textAlign:"center"}} data-toggle="collapse" data-target="#productSubMenu">
                    <div>
                        <span className="menu-item-label">製品管理</span>
                    </div>
                </a>

                <div className="menu-list collapse" id="productSubMenu">

                    <a onClick={handleClick} className={supplier_className} href="/supplier">
                        <div >
                            <span className="menu-item-label">サプライヤー</span>
                        </div>
                    </a>

                    <a onClick={handleClick} className={product_className} href="/product">
                        <div >
                            <span className="menu-item-label">製品管理</span>
                        </div>
                    </a>

                    <a onClick={handleClick} className={import_className} href="/import">
                        <div >
                            <span className="menu-item-label">輸入管理</span>
                        </div>
                    </a>

                    <a onClick={handleClick} className={export_className} href="/export">
                        <div >
                            <span className="menu-item-label">輸出管理</span>
                        </div>
                    </a>

                    <a onClick={handleClick} className={report_className} href="/report">
                        <div >
                            <span className="menu-item-label">レポート</span>
                        </div>
                    </a>

                </div>

                <a className={tool_className} href="/tools">
                    <div>
                        <span className="menu-item-label">倉庫用品</span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default NewMenu