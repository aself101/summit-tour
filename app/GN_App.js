import React, { Component } from 'react';
import { Link } from 'react-router';
import SideNav from './components/sidenav';
import { DUMMY_STATE, HEADERS, SELECT_OPTS, RADIO_OPTS, autocomplete_data } from './components/data';
import TourList from './containers/TourList';
import Filters from './components/Filters';
import TourDetail from './containers/TourDetail';
import ButtonNav from './components/floatingNav';

export default class GNApp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Detect user language
    var userLang = navigator.language || navigator.userLanguage;
  }
  render() {
    return (
      <div>
        {/*<ButtonNav />*/}
        <div id="table-tour-display" className="container">
          <div className="card z-depth-2">
            <center>
              <h4><b>North Tours</b></h4>
              <h5><b><Link to="/gs">S Tours</Link></b></h5>
            </center>
          </div>
          <br />
          <Filters />
          <TourList loc={"GN"} />
        </div>
        <div id="single-tour-display" className="container">
          <TourDetail />
        </div>
      </div>
    );
  }
};









/* */
