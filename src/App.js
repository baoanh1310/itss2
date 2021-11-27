import React, {useState} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import SignIn from './components/SignIn'

const App = () => {
  return (
    <Router>
    	<div className="App">
	      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
	        <div className="container">
	          <Link className="navbar-brand" to={"/sign-in"}>NewWorld Supply Chain</Link>
	        </div>
	      </nav>

	      <div className="outer">
	        <div className="inner">
	          <Switch>
	            <Route exact path='/' component={SignIn} />
	            <Route path="/sign-in" component={SignIn} />
	          </Switch>
	        </div>
	      </div>
	    </div>
    </Router>
  )
}

export default App
