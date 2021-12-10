import React, {useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import SignIn from './components/SignIn'
import Homepage from './components/Homepage'
import Forget from './components/Forget'
import './App.css'

const App = () => {
  return (
    <Router>
    	<div className="App">
         	<Switch>
            	<Route exact path="/dashboard" component={() => <Homepage label="ダッシュボード" model="dashboard" />} />
            	<Route exact path="/supplier" component={() => <Homepage label="サプライヤー" model="supplier" btnTitle="新サプライヤー" />} />
            	<Route exact path="/product" component={() => <Homepage label="製品管理" model="product" btnTitle="新製品" />} />
            	<Route exact path="/searchResult" component={() => <Homepage label="検索結果" model="searchResult" btnTitle="検索結果" />} />
            	<Route exact path="/import" component={() => <Homepage label="輸入管理" model="import" btnTitle="新製品" />} />
            	<Route exact path="/export" component={() => <Homepage label="輸出管理" model="export" btnTitle="新製品" />} />
            	<Route exact path="/report" component={() => <Homepage label="レポート" model="report" />} />
            	<Route exact path="/profile" component={() => <Homepage label="プロフィール" model="profile" />} />
            	<Route exact path="/sign-in" component={SignIn} />
              <Route exact path="/" component={SignIn} />
            	<Route exact path="/forget" component={Forget} />
          </Switch>
	    </div>
    </Router>
  )
}

export default App
