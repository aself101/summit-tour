/*
  Selected tour reducer

*/
import { TOUR_SELECTED, ADD_TOUR_MEMBER, DELETE_TOUR_MEMBER,
         APPROVE_TOUR, DENY_TOUR, ASSIGN_TOUR, ADD_COMMENT, ADD_TOUR_INFO } from '../actions';




export default function(state = null, action) {
  switch (action.type) {
    case TOUR_SELECTED:
      return action.payload;
    case ADD_TOUR_MEMBER:
      return action.tour;
    case DELETE_TOUR_MEMBER:
      return action.payload;
    case APPROVE_TOUR:
      return action.payload;
    case DENY_TOUR:
      return denyTour(action.payload, action.reasons);
    case ASSIGN_TOUR:
      return action.payload;
    case ADD_COMMENT:
      return action.payload;
    case ADD_TOUR_INFO:
      return action.payload;
    default:
      return state;
  }
}


function denyTour(state, reasons) {
  const main = Object.assign({}, state.main, {
    denialReasons: reasons
  })
  return Object.assign({}, state, {
    main: main
  });
}











/* END */
