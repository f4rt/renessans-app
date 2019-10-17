import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'

const root = document.getElementById('entry')

if (root) {
	ReactDOM.render(
		<App/>, 
		root
	)
}