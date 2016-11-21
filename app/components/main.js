/*
  Alexander Self
  9/28/16
  Tour application
  main.js: The main page where users will select between GN and GS tours
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../actions';
import { Link } from 'react-router';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div>
        <div className="container">
          <br /><br /><br />
          <center>
            <div className="card z-depth-2"><h2>Gemini Summit Tours</h2></div>
            <br />
            <p><Link to="/gn"><button className="btn btn-large waves-effect">Gemini North (GN) Tours</button></Link></p>
            <br />
            <p><Link to="/gs"><button className="btn btn-large waves-effect">Gemini South (GS) Tours</button></Link></p>
          </center>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


















































/* END */
