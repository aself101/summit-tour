import React, { Component } from 'react';
import utf8 from 'utf8';

class Table extends Component {
  constructor(props) {
    super(props);
    this.showHeaders = this.showHeaders.bind(this);
    this.showTours = this.showTours.bind(this);
    this.convertAge = this.convertAge.bind(this);
  }
  showHeaders() {
    if (!this.props.headers) {
      return;
    } else {
      return this.props.headers.map(h => (
        <th key={h.key}>{h.header}</th>
      ))
    }
  }
  convertAge(age) {
    let placeholder = 'Under 18';
    switch (age) {
      case "1":
        return placeholder;
      case "2":
        placeholder = '18 and Older';
        return placeholder;
      default:
        return placeholder;
    }
  }
  showTours() {
    if (!this.props.state) {
      return <tr><td></td></tr>;
    } else {
      return this.props.state.tourMembers.map(t => (
        <tr key={t.ID}>
          <td>{utf8.decode(t.NAME)}</td>
          <td>{this.convertAge(t.AGE)}</td>
          <td>{utf8.decode(t.DISABILITY)}</td>
          <td><button className="btn waves-effect waves-light red deleteMember" onClick={() => this.props.onClick(this.props.state, t)}>Delete</button></td>
        </tr>
      ))
    }
  }
  render() {
    return (
      <table className="bordered centered">
        <thead>
          <tr>
            { this.showHeaders() }
          </tr>
        </thead>
        <tbody>
          { this.showTours() }
        </tbody>
      </table>
    );
  }
};

export default Table;
