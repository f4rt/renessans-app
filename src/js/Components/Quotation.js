import React, { Component } from 'react';

class Quotation extends Component {
  state = {
    startDate: '',
    endDate: ''
  }

  inputHandlerr = (e) =>
    this.setState({ [e.target.name]: e.target.value });

  render() { 
    const {startDate, endDate} = this.state

    return (
      <div className="quotation">
        <div className="quotation__bottom-bar">
          <input 
            placeholder="Начальная дата"
            type="text" 
            name="startDate" 
            value={startDate} 
            onChange={this.inputHandlerr} 
          />
          <input 
            placeholder="Конечная дата"
            type="text" 
            name="endDate" 
            value={endDate} 
            onChange={this.inputHandlerr} 
          />
        </div>
        <button>Получить данные</button>
      </div>
    );
  }
}
 
export default Quotation;