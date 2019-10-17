import React, { Component } from 'react';
import axios from 'axios'
import Calendar from './Calendar'

class App extends Component {
	state = {
		valutes: []
	}

	componentDidMount = () => {
		axios.get(`${document.location.protocol}/api/valutes`)
			.then(res => this.setState({ valutes: res.data }))
			.catch(err => console.error(err))
	}
	
	render() {
		const {valutes} = this.state

		const valutesList = valutes.map(item => 
				<tr key={item.valuteID}>
					<td>{item.NumCode}</td>
					<td>{item.CharCode}</td>
					<td>{item.Nominal}</td>
					<td>{item.Name}</td>
					<td>{item.Value}</td>
				</tr>
			)

		return (
			<div className="container">
				<Calendar/>
				<table>
					<tbody>
					<tr>
						<td>Цифровой код</td>
						<td>Буквенный код</td>
						<td>Единиц</td>
						<td>Валюта</td>
						<td>Курс</td>
					</tr>
					{valutesList}
					</tbody>
				</table>
			</div>
		);
	}
}
 
export default App;