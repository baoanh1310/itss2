import React, { useState } from "react"
import './Menu.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const NewMenu = (props) => {

    const avoidPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div id="menu">
            <img src="/logo.png" alt="logo" id="menuLogo" />
            <div className="menu-list">

                <a className="menu-item-disabled" href="/dashboard">
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

                    <a onClick={avoidPropagation} className="menu-sub-item" href="/supplier">
                        <div >
                            <span className="menu-item-label">サプライヤー</span>
                        </div>
                    </a>

                    <a onClick={avoidPropagation} className="menu-sub-item" href="/product">
                        <div >
                            <span className="menu-item-label">製品管理</span>
                        </div>
                    </a>

                    <a onClick={avoidPropagation} className="menu-sub-item" href="/import">
                        <div >
                            <span className="menu-item-label">輸入管理</span>
                        </div>
                    </a>

                    <a onClick={avoidPropagation} className="menu-sub-item" href="/export">
                        <div >
                            <span className="menu-item-label">輸出管理</span>
                        </div>
                    </a>

                    <a onClick={avoidPropagation} className="menu-sub-item" href="/report">
                        <div >
                            <span className="menu-item-label">レポート</span>
                        </div>
                    </a>

                </div>

                <a className="menu-item-disabled" href="/tools">
                    <div>
                        <span className="menu-item-label">倉庫用品</span>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default NewMenu