import React, { useState } from "react"
import Skeleton from "react-loading-skeleton"

const Dashboard = (props) => {

    let numberSupplier = props.suppliers.length;
    let numberProductCategories = props.products.length;
    let numberAlmostOutOfStock = props.products.filter(product => product.amount < 10 && product.amount > 0).length;
    let numberOutOfStock = props.products.filter(product => product.amount == 0).length;

    return (
        <div style={{display: "flex", marginTop: "20px"}}>
            <Card label="製品の種類の数" text={numberProductCategories} />
            <Card label="サプライヤーの数" text={numberSupplier} />
            <Card label="商品の在庫がなくなりそうだ" text={numberAlmostOutOfStock} />
            <Card label="商品数量が在庫切れ" text={numberOutOfStock} />
        </div>
    )
}

const Card = (props) => {
    return (
        <div className="card col-sm-3">
            <div className="card-body">
                <h4 className="card-title text-center">{props.label}</h4>
                <h1 className="card-text text-center">{props.text || <Skeleton />}</h1>
            </div>
        </div>
    )
}

export default Dashboard