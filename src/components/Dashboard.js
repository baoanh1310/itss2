import React, { useState } from "react"
// import Skeleton from "react-loading-skeleton"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ListCardDashboard from './ListCardDashboard'
import ContentDashboard from "./ContentDashboard"

const Dashboard = (props) => {

    const [modal, setModal] = useState()

    let numberSupplier = props.suppliers.length;
    let numberProductCategories = props.products.length;
    let numberAlmostOutOfStock = props.products.filter(product => product.amount < 10 && product.amount > 0).length;
    let numberOutOfStock = props.products.filter(product => product.amount == 0).length;

    const handleClick = (e) => {
				let p, s, m, l;

        if(e.target.value==='1'){
						p = props.products
						s = props.suppliers
						m = "products"
						l = "製品の種類の数"
        }else if(e.target.value==='2'){
						p = props.products
						s = props.suppliers
						m = "suppliers"
						l = "サプライヤーの数"
        }else if(e.target.value==='3'){
						p = props.products.filter(product => product.amount < 10 && product.amount > 0)
						s = props.suppliers
						m = "products_sap_het"
						l = "商品の在庫がなくなりそうだ"
        }else if(e.target.value==='4'){
						p = props.products.filter(product => product.amount == 0)
						s = props.suppliers
						m = "products_da_het"
						l = "商品数量が在庫切れ"
        }
        setModal(<ContentDashboard suppliers={s} products={p} model={m} label={l}/>)
    }

  
    return (
        <>
           
            <div style={{display: "flex", marginTop: "20px"}}>
            <a style={{textDecoration: "none", color: "black"}} href={props.href} className="card col-sm-3">
                <Card data-toggle="tab" label="製品の種類の数" text={numberProductCategories} suppliers={props.suppliers} products={props.products} model="products"/>
                <div className="row align-self-center">
                    <button className="btn btn-primary" onClick={handleClick} value="1">続きを見る</button>
                </div>
            </a>
            <a style={{textDecoration: "none", color: "black"}} href={props.href} className="card col-sm-3">
            <   Card data-toggle="tab" label="サプライヤーの数" text={numberSupplier} suppliers={props.suppliers} products={props.products} model="suppliers"/>
                <div className="row align-self-center">
                    <button className="btn btn-primary" onClick={handleClick} value="2">続きを見る</button>
                </div>
            </a>
            <a style={{textDecoration: "none", color: "black"}} href={props.href} className="card col-sm-3">
                <Card data-toggle="tab" label="商品の在庫がなくなりそうだ" text={numberAlmostOutOfStock} suppliers={props.suppliers} products={props.products.filter(product => product.amount < 10 && product.amount > 0)} model="products_sap_het"/>
                <div className="row align-self-center">
                    <button className="btn btn-primary" onClick={handleClick} value="3">続きを見る</button>
                </div>
            </a>
            <a style={{textDecoration: "none", color: "black"}} href={props.href} className="card col-sm-3">
                <Card data-toggle="tab" label="商品数量が在庫切れ" text={numberOutOfStock} suppliers={props.suppliers} products={props.products.filter(product => product.amount == 0)} model="products_da_het"/>
                <div className="row align-self-center">
                    <button className="btn btn-primary" onClick={handleClick} value="4">続きを見る</button>
                </div>
            </a>
         
            </div>
            {modal}
            
        </>
    )
}

const Card = (props) => {

    let modal

    

    let renderText = props.text
    if (props.text == 0) {
        renderText = <h1 className="card-text text-center" style={{marginTop: "50px"}}>0</h1>
    } else if (props.text > 0) {
        renderText = <h1 className="card-text text-center" style={{marginTop: "50px"}}>{props.text}</h1>
    } 
    // else {
    //     renderText = <h1 className="card-text text-center" style={{marginTop: "50px"}}>{<Skeleton />}</h1>
    // }

    return (
        <>
            <div className="card-body" >
                <h4 className="card-title text-center" style={{height: "40px", marginTop: "20px"}}>{props.label}</h4>
                {renderText}
            </div>
        </>
    )
}

export default Dashboard