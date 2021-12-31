import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Dashboard = (props) => {

    let numberSupplier = props.suppliers.length;
    let numberProductCategories = props.products.length;
    let numberAlmostOutOfStock = props.products.filter(product => product.amount < 10 && product.amount > 0).length;
    let numberOutOfStock = props.products.filter(product => product.amount == 0).length;

    return (
        <div style={{display: "flex", marginTop: "20px"}}>
            <Card data-toggle="tab" href="/product" label="製品の種類の数" text={numberProductCategories} />
            <Card data-toggle="tab" href="/supplier" label="サプライヤーの数" text={numberSupplier} />
            <Card data-toggle="tab" href="/report#almostOutOfStock" label="商品の在庫がなくなりそうだ" text={numberAlmostOutOfStock} />
            <Card data-toggle="tab" href="/report#outOfStock" label="商品数量が在庫切れ" text={numberOutOfStock} />
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

export default Dashboard