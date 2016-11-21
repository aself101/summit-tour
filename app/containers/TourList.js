/*
  Alexander Self
  9/6/16
  Redux TourList Container
  Maintains state, dispatch of table describing tours
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import utf8 from 'utf8';
import { browserHistory } from 'react-router';

import { firstCharToUpper } from '../helpers';
import { HEADERS } from '../components/data';
import { selectTour, fetchTours, updateTours } from '../actions/index';
import Button from '../components/inputs';
import { getStatus } from '../helpers';


const getVisibleTours = (tours, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return tours;
    case 'SHOW_NEW':
      return tours.filter((tour) => tour.main.STATUS === '0');
    case 'SHOW_PENDING':
      return tours.filter((tour) => tour.main.STATUS === '1');
    case 'SHOW_APPROVED':
      return tours.filter((tour) => tour.main.STATUS === '2');
  }
};

class TourList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Quick check if user has been authenticated
    if (Object.keys(this.props.user).length === 0) {
      browserHistory.push('/');
    }
    this.props.loadTours(this.props.loc);
  }

  render() {
    return (
      <div>
        <table className="bordered highlight">
          <thead>
            <tr>
              {
                this.props.headers.map(h => (
                  <th key={h.key}>{h.header}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.tours.map((tour) => (
                <tr key={Math.random()}>
                  <td><a id={tour.main.ID} onClick={() => this.props.selectTour(tour, this.props.tours)}>{firstCharToUpper(tour.main.TYPE)}</a></td>
                  <td>{utf8.decode(tour.main.pocName)}</td>
                  <td>{tour.main.dateStart}</td>
                  <td>{tour.main.TIME}</td>
                  <td>{utf8.decode(tour.main.organizationName)}</td>
                  <td>{tour.tourMembers.length}</td>
                  <td>{getStatus(tour.main.STATUS)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return {
    tours: getVisibleTours(state.tours, state.TourVisibilityFilter),
    headers: HEADERS,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTour: selectTour,
    loadTours: fetchTours
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TourList);







































/* END */
