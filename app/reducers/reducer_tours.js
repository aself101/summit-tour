/*
  Alexander Self
  9/28/16
  Gemini Observatory
  Summit tour application
  reducer_tours.js: Returns all tours and updated tours
*/
import { FETCH_TOURS, UPDATE_TOURS } from '../actions';

// To sort the tours after a change
function compare(a, b) {
  if (a.main.dateStart < b.main.dateStart) return -1;
  if (a.main.dateStart > b.main.dateStart) return 1;
  return 0;
}

// Updates the tour and returns updated list
function updateTours(tours, tour) {
  var newState = tours.filter((t) => (
    t.main.ID !== tour.main.ID
  ));

  newState = newState.concat(tour);

  return newState.sort(compare);
}

export default function ToursReducer(state = [], action) {
  switch (action.type) {
    case FETCH_TOURS:
      // TODO: Grab tours based on location GN or GS
      return action.payload.sort(compare);
    case UPDATE_TOURS:
      action.slide();
      return updateTours(action.tours, action.tour);
    default:
      return state;
  }
}























/* END */
