import React, { Component } from 'react';
import axios from 'axios';

class Calendar extends Component {
	state = {
		day: new Date().getDate(),
		month: new Date().getMonth() + 1,
		year: "2019"
	}

	calcDaysNumber = (month, year) => {
		return new Date(year, month, 0).getDate();
	}

	normalize = (value) => {
		if (value.length < 2)
			value = "0" + value
		return value
	}

	selectDate = (type, value) => {
		let selectedDate = {
			day: this.state.day.toString(),
			month: this.state.month.toString(),
			year: this.state.year.toString(),
		}

		switch (type) {
			case 'day':
				selectedDate.day = value
				break;
			case 'month':
				selectedDate.month = value
				break;
			case 'year':
				selectedDate.year = value
				break;
			default:
				break;
		}

		let dateStr = `${this.normalize(selectedDate.day)}/${this.normalize(selectedDate.month)}/${selectedDate.year}`
		this.props.callback(dateStr)
		
	}

	setMonth = (e) => {
		this.setState({ month:  e.target.value});
		this.selectDate('month', e.target.value)
	}

	setYear = (e) => {
		this.setState({ year:  e.target.value});
		this.selectDate('year', e.target.value)
	}

	componentDidMount = () => {
		this.selectDate('year', "2019")
	}
	
	render() {
		const {day, month, year} = this.state

		// здесь может быть баг с 01 и 1
		const days = () => {
			let daysGrid = []
			let currentMonth = month
			let currentYear = year
			let daysNumber = this.calcDaysNumber(+currentMonth, +currentYear)
			for(let i = 0; i < daysNumber; i++) {
				daysGrid.push(
					<div 
						key={i} 
						data-type="day"
						data-value={i+1}
						onClick={(e) => this.selectDate(e.target.dataset.type, e.target.dataset.value)}
					>
						{i+1}
					</div>
				)
			}
			return daysGrid;
		}

		return (
			<div className="calendar">
				<div className="calendar__top-bar">
					<select onChange={this.setMonth} value={month}>
						<option value="1">Январь</option>
						<option value="2">Февраль</option>
						<option value="3">Март</option>
						<option value="4">Апрель</option>
						<option value="5">Май</option>
						<option value="6">Июнь</option>
						<option value="7">Июль</option>
						<option value="8">Август</option>
						<option value="9">Сентябрь</option>
						<option value="10">Октябрь</option>
						<option value="11">Ноябрь</option>
						<option value="12">Декабрь</option>
					</select>
					<select onChange={this.setYear} value={year}>
						<option value="2005">2005</option>
						<option value="2006">2006</option>
						<option value="2007">2007</option>
						<option value="2008">2008</option>
						<option value="2009">2009</option>
						<option value="2010">2010</option>
						<option value="2011">2011</option>
						<option value="2012">2012</option>
						<option value="2013">2013</option>
						<option value="2014">2014</option>
						<option value="2015">2015</option>
						<option value="2016">2016</option>
						<option value="2017">2017</option>
						<option value="2018">2018</option>
						<option value="2019">2019</option>
					</select>
				</div>
				<div className="calendar__days">
					{days()}
				</div>
			</div>
		);
	}
}
 
export default Calendar;