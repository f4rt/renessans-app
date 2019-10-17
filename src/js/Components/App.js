import React, { Component } from 'react';
import axios from 'axios'
import Calendar from './Calendar'
import Quotation from './Quotation'

class App extends Component {
	state = {
		render: false, // костыль для ререндера (нужен из за того что не меняется длина массива valutes)
		valutes: []
	}

	getExchangeRates = (date) => {
		axios.get(`${document.location.protocol}/api/valutes?date=${date}`)
			.then(res => this.setState({ 
				valutes: res.data,
				render: !this.state.render
			}))
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
				<div className="split">
					<Calendar
						callback = {this.getExchangeRates}
					/>
					<Quotation
					/>
				</div>
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