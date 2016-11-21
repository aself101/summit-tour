/*
  Alexander Self
  9/6/2016
  ** Redux Actions **

*/

/*******************************************************************************
  Functions to send with actions
*******************************************************************************/
// To be an ajax call
import { DUMMY_STATE } from '../components/data';
import { fillValues, resetValues, slideFrontPage, slideOutFrontPage } from '../helpers';
// URL to PHP database script
const URL = `php/index.php`;

// Main AJAX function uses promise; used in all async action calls => database interactions
function ajax(type, id, d={}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url: `${URL}?${id}`,
      cache: false,
      data: { data: d },
      success: (data) => {
        resolve(data);
      },
      error: (xhr, status, err) => {
        reject(new Error(xhr, status, err.toString()))
      }
    });
  });
}

/************************* ACTION CONSTANTS ************************************/
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER',
             TOUR_SELECTED = 'TOUR_SELECTED',
             UPDATE_TOURS = 'UPDATE_TOURS',
             FETCH_TOURS = 'FETCH_TOURS',
             ADD_TOUR_MEMBER = 'ADD_TOUR_MEMBER',
             DELETE_TOUR_MEMBER = 'DELETE_TOUR_MEMBER',
             APPROVE_TOUR = 'APPROVE_TOUR',
             DENY_TOUR = 'DENY_TOUR',
             ASSIGN_TOUR = 'ASSIGN_TOUR',
             ADD_COMMENT = 'ADD_COMMENT',
             ADD_TOUR_INFO = 'ADD_TOUR_INFO',
             GET_USER = 'GET_USER';
/************************************************ All Actions ************************************************/

/******************************* ASYNCHRONOUS Actions **********************************/
/*
  Async actions dispatch sync actions
*/
export function getUser() {
  return (dispatch) => {
    return ajax('GET', 'getUser')
      .then((user) => JSON.parse(user))
      .then((user) => dispatch(receiveUser(user)))
  };
}

// Initial pull of data to populate table
export function fetchTours(loc) {
  return (dispatch) => {
    return ajax('GET', 'tours')
      .then((tours) => JSON.parse(tours))
      .then((tours) => dispatch(receiveTours(tours, loc)))
  };
}
// Adds a member to the tour
export function addTourMember(tour, member) {
  const new_member = member();
  return (dispatch) => {
    return ajax('GET', 'addmember', new_member)
      .then((t) => JSON.parse(t))
      .then((t) => dispatch(updateTourMember(t, new_member)))
  };
}
// Delete member from tour
export function deleteTourMemberAsync(tour, member) {
  return (dispatch) => {
    return ajax('GET', 'deletemember', member)
      .then((t) => JSON.parse(t))
      .then((t) => dispatch(deleteTourMember(t)))
  };
}
// Approves a tour
export function approveTourAsync(approver) {
  return (dispatch) => {
    return ajax('GET', 'approvetour', approver)
  };
}
// Adds information from assign tour form
export function addTourInfoAsync(tourInfo) {
  const info = tourInfo();
  return (dispatch) => {
    return ajax('GET', 'addtourinfo', info)
      .then((t) => JSON.parse(t))
      .then((t) => dispatch(addTourInfo(t)))
  };
}
// Assigns a tour and sets status to Approved
export function assignTourAsync(tour, tourInfo) {
  const data = {
    info: tourInfo(),
    tour: tour
  };
  return (dispatch) => {
    return ajax('GET', 'assigntour', data)
      .then((t) => JSON.parse(t))
      .then((t) => dispatch(assignTour(t)))
  };
}
// Denies a tour
export function denyTourAsync(reasons) {
  const _reasons = reasons();
  return (dispatch) => {
    return ajax('GET', 'denytour', _reasons)
      .then((t) => JSON.parse(t))
      .then((t) => dispatch(denyTour(t, _reasons.reasons)))
  };
}
// Adds a comment
export function addCommentAsync(comment) {
  const _comment = comment();
  return (dispatch) => {
    return ajax('GET', 'addcomment', _comment)
      .then((t) => JSON.parse(t))
      .then((t) => dispatch(addComment(t)))
  };
}
/******************************* SYNCHRONOUS Actions ***********************************/
export function receiveUser(user) {
  return {
    type: GET_USER,
    payload: user
  };
}

// Sets the filter based on tour status
export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}

// Selects a tour
export function selectTour(tour, tours) {
  fillValues(tour);
  slideOutFrontPage();
  return {
    type: TOUR_SELECTED,
    payload: tour,
    tours: tours
  };
}

// Slides in front table page
export function updateTours(tour, tours) {
  resetValues();
  return {
    type: UPDATE_TOURS,
    tour: tour,
    tours: tours,
    slide: slideFrontPage
  };
}
function receiveTours(tours, loc) {
  return {
    type: FETCH_TOURS,
    payload: tours,
    loc: loc
  }
}

// Adds tour members to the indiviaual tour selected
export function updateTourMember(tour, member) {
  return {
    type: ADD_TOUR_MEMBER,
    tour: tour,
    payload: member
  };
}

// Deletes a tour member
export function deleteTourMember(tour) {
  return {
    type: DELETE_TOUR_MEMBER,
    payload: tour
  };
}

// Approves a tour
export function approveTour(tour) {
  return {
    type: APPROVE_TOUR,
    payload: tour
  };
}

// Deny's a tour
export function denyTour(tour, reasons) {
  const deny_msg = `<b>${tour.main.pocName} tour has been denied.</b>`;
  Materialize.toast(deny_msg, 3000, 'rounded red');
  return {
    type: DENY_TOUR,
    payload: tour,
    reasons: reasons
  };
}

// Assigns the tour; sets status to Scheduled
export function assignTour(tour) {
  return {
    type: ASSIGN_TOUR,
    payload: tour
  };
}

// Adds information to the tour through the assign tour form
export function addTourInfo(tour) {
  return {
    type: ADD_TOUR_INFO,
    payload: tour
  };
}

// Adds a comment to the tour
export function addComment(tour) {
  return {
    type: ADD_COMMENT,
    payload: tour
  };
}

// Emergency cancellation of tour
export function emergencyCancel(tour, cancellation) {
  return {
    type: EMERGENCY_CANCEL,
    tour: tour,
    payload: cancellation
  };
}
/******************************************************************************/

// For testing only
export function selectTour_spec(tour, tours) {
  return {
    type: TOUR_SELECTED,
    payload: tour,
    tours: tours
  };
}
export function updateTours_spec(tour, tours) {
  return {
    type: UPDATE_TOURS,
    tour: tour,
    tours: tours
  };
}




















/* END */
