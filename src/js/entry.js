import React from 'react'
import ReactDOM from 'react-dom'
import Test from './Components/Test'

const root = document.getElementById('entry')

if (root) {
	ReactDOM.render(
		<Test/>, 
		root
	)
}