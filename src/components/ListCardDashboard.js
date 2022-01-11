import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const ListCardDashboard = (props) => {

    const [model, setModel] = useState('products')

    const handleClick = (e) => {
        setModel('products')
    }

    let selectedItem = props.selected
    // let product_list = selectedItem === "dashboard" ? "menu-item-disabled menu-item-selected" : "menu-item-disabled"
    // let supplier_list = selectedItem === "supplier" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let product_className = selectedItem === "product" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let import_className = selectedItem === "import" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let export_className = selectedItem === "export" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let report_className = selectedItem === "report" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let tool_className = selectedItem === "tools" ? "menu-item-disabled menu-item-selected" : "menu-item-disabled"

    // let dashboard_className = selectedItem === "dashboard" ? "menu-item-disabled menu-item-selected" : "menu-item-disabled"
    // let supplier_className = selectedItem === "supplier" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let product_className = selectedItem === "product" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let import_className = selectedItem === "import" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let export_className = selectedItem === "export" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let report_className = selectedItem === "report" ? "menu-sub-item menu-item-selected" : "menu-sub-item"
    // let tool_className = selectedItem === "tools" ? "menu-item-disabled menu-item-selected" : "menu-item-disabled"


    let numberSupplier = props.suppliers.length;
    let numberProductCategories = props.products.length;
    let numberAlmostOutOfStock = props.products.filter(product => product.amount < 10 && product.amount > 0).length;
    let numberOutOfStock = props.products.filter(product => product.amount == 0).length;
    console.log(props.products.filter(product => product.amount == 0))


    return (
        
        <div style={{display: "flex", marginTop: "20px"}}>
            <Card data-toggle="tab" label="製品の種類の数" text={numberProductCategories} onClick={handleClick} />
            <Card data-toggle="tab" label="サプライヤーの数" text={numberSupplier} />
            <Card data-toggle="tab" label="商品の在庫がなくなりそうだ" text={numberAlmostOutOfStock} />
            <Card data-toggle="tab" label="商品数量が在庫切れ" text={numberOutOfStock} />
        </div>
    )
}

const Card = (props) => {

    let renderText = props.text
    if (props.text == 0) {
        renderText = <h1 className="card-text text-center" style={{marginTop: "50px"}}>0</h1>
    } else if (props.text > 0) {
        renderText = <h1 className="card-text text-center" style={{marginTop: "50px"}}>{props.text}</h1>
    } else {
        renderText = <h1 className="card-text text-center" style={{marginTop: "50px"}}>{<Skeleton />}</h1>
    }

    return (
        <a style={{textDecoration: "none", color: "black"}} href={props.href} className="card col-sm-3">
            <div className="card-body">
                <h4 className="card-title text-center" style={{height: "40px", marginTop: "20px"}}>{props.label}</h4>
                {renderText}
            </div>
        </a>
    )
}

export default ListCardDashboard