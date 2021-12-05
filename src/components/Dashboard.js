import React, { useState } from "react"

const Dashboard = (props) => {

    let numberSupplier = props.suppliers.length;
    let numberProductCategories = props.products.length;
    let numberOutOfStock = props.products.filter(product => product.amount < 10).length;

    return (
        <div style={{display: "flex", marginTop: "20px"}}>
            <Card label="製品の種類の数" text={numberProductCategories} />
            <Card label="サプライヤーの数" text={numberSupplier} />
            <Card label="商品の在庫がなくなりそうです" text={numberOutOfStock} />
        </div>
    )
}

const Card = (props) => {
    return (
        <div className="card col-sm-4">
            <div className="card-body">
                <h3 className="card-title text-center">{props.label}</h3>
                <h1 className="card-text text-center">{props.text}</h1>
            </div>
        </div>
    )
}

export default Dashboard