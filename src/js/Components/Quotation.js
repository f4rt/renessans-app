import React, { Component } from 'react';
import Plot from 'react-plotly.js'
import axios from 'axios';

class Quotation extends Component {
  state = {
    startDate: `2019-${new Date().getMonth() + 1}-01`,
    endDate: `2019-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    dates: [],
    values: []
  }

  inputHandlerr = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  formatDate = (date) => {
    let dateSplit = date.split('-')
    let newDate = ''
    for(let i = dateSplit.length - 1; i >= 0; i--) {
      if (i != 0) {
        newDate += dateSplit[i] + '/'
        continue
      }
      newDate += dateSplit[i]
    }

    return newDate
  }

  getData = () => {
    const {startDate, endDate} = this.state

    if (startDate && endDate) {
      axios.get(`${document.location.protocol}/api/quotation?startDate=${this.formatDate(startDate)}&endDate=${this.formatDate(endDate)}&valuteId=${this.props.valute}`)
        .then(res =>
          this.setState({ 
            dates: res.data.dates,
            values: res.data.values
          })
        )
        .catch(err => console.error(err))
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.valute !== this.props.valute)
      this.getData()
  }

  render() { 
    const {startDate, endDate, dates, values} = this.state

    return (
      <div className="quotation">
        <div className="block__title">Динамика курса выбранной валюты</div>
        {dates && values &&
          <Plot
            data={[
              {
                x: dates,
                y: values,
                type: 'scatter',
              }
            ]}
          />
        }
        <div className="quotation__bottom-bar">
          <input 
            placeholder="Начальная дата"
            type="date" 
            name="startDate" 
            value={startDate}
            min="2010-01-01"
            max={`2019-${new Date().getMonth() + 1}-${new Date().getDate()}`}
            onChange={this.inputHandlerr} 
          />
          <input 
            placeholder="Конечная дата"
            type="date" 
            name="endDate"
            value={endDate} 
            min="2010-01-01"
            max={`2019-${new Date().getMonth() + 1}-${new Date().getDate()}`}
            onChange={this.inputHandlerr} 
          />
        </div>
        <button onClick={this.getData}>Получить данные</button>
      </div>
    );
  }
}
 
export default Quotation;