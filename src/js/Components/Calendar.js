import React, { Component } from 'react';

class Calendar extends Component {
	state = {
		day: "1",
		month: "1",
		year: "2019"
	}

	componentDidMount = () => {
		let date = new Date;
		let today = date.getMonth() + 1
		this.setState({ 
			day: date.getDate().toString(),
			month: today.toString(),
		});
	}

	calcDaysNumber = (month, year) => {
		return new Date(year, month, 0).getDate();
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
				daysGrid.push(<div key={i}>{i+1}</div>)
			}
			return daysGrid;
		}

		const ss = days();

		return (
			<div className="calendar">
				<div className="calendar__top-bar">
					<select onChange={(e) => this.setState({ month: e.target.value })} value={month}>
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
					<select onChange={(e) => this.setState({ year: e.target.value })} value={year}>
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