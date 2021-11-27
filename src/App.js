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
            	<Route exact path="/" component={Homepage} />
            	<Route exact path="/sign-in" component={SignIn} />
            	<Route exact path="/forget" component={Forget} />
          	</Switch>
	    </div>
    </Router>
  )
}

export default App
