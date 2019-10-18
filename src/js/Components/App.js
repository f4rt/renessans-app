import React, { Component } from 'react';
import axios from 'axios'
import Calendar from './Calendar'
import Quotation from './Quotation'

class App extends Component {
	state = {
		render: false, // костыль для ререндера (нужен из за того что не меняется длина массива valutes)
		valutes: [],
		selectedValute: ''
	}

	getExchangeRates = (date) => {
		let currentValute = this.state.selectedValute
		axios.get(`${document.location.protocol}/api/valutes?date=${date}`)
			.then(res => this.setState({ 
				valutes: res.data,
				render: !this.state.render,
				selectedValute: currentValute || res.data[0].valuteID
			}))
			.catch(err => console.error(err))
	}

	selectValute = (e) =>
		this.setState({ selectedValute: e.target.dataset.value });
	
	render() {
		const {valutes, selectedValute} = this.state

		const valutesList = valutes.map(item => 
				<tr 
					key={item.valuteID} 
					className={selectedValute == item.valuteID ? 'active' : ''}
					data-value={item.valuteID}
					onClick = {this.selectValute}
				>
					<td data-value={item.valuteID} onClick = {this.selectValute}>
						{item.NumCode}
					</td>
					<td data-value={item.valuteID} onClick = {this.selectValute}>
						{item.CharCode}
					</td>
					<td data-value={item.valuteID} onClick = {this.selectValute}>
						{item.Nominal}
					</td>
					<td data-value={item.valuteID} onClick = {this.selectValute}>
						{item.Name}
					</td>
					<td data-value={item.valuteID} onClick = {this.selectValute}>
						{item.Value}
					</td>
				</tr>
			)

		return (
			<div className="container">
				<div className="split">
					<div>
						<div className="block__title">Курс валют</div>
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
					<div>
						<div className="side">
							<Calendar
								callback = {this.getExchangeRates}
							/>
							<Quotation
								valute = {selectedValute}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
 
export default App;