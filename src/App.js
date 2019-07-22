import React from "react";
import Tippy from '@tippy.js/react'
class App extends React.Component {
  state = {
    years: "90",
    date: "1983-09-15",
    total: ""
  };

  processDate = date => {
    const processedDate = new Date(Date.parse(date));
    return {
      year: processedDate.getFullYear(),
      month: processedDate.getMonth()
    };
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { year: birthYear, month: birthMonth } = this.processDate(
      this.state.date
    );
    const { year: currentYear, month: currentMonth } = this.processDate(
      new Date()
    );

    const total =
      (currentYear - (birthYear + 1)) * 12 +
      (12 - birthMonth) +
      (currentMonth - 1);

    this.setState({ total });
  };

  render() {
    const { years, total } = this.state;
    const months = [...Array(years * 12).keys()];

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Date of Birth</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <label htmlFor="years">Life Expectancy</label>
          <input
            id="years"
            type="number"
            name="years"
            value={this.state.years}
            onChange={this.handleChange}
          />
          <button type="submit">Show Life!</button>
        </form>
        <div className="years">
          {months.map(month => (
            <Tippy content={month + 1}>
              <div key={month} className={month < total ? `box fill` : `box`} />
            </Tippy>
          ))}
        </div>
      </>
    );
  }
}

export default App;
