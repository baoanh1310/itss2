import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

ReactDOM.render(
	<BrowserRouter>
  		<App />
  	</BrowserRouter>,
  	document.getElementById('root')
)