import { combineReducers } from 'redux';
import ToursReducer from './reducer_tours';
import SelectedTour from './reducer_selected_tour';
import UserReducer from './reducer_user';
import { TourVisibilityFilter } from './reducer_visibilityFilter';

const rootReducer = combineReducers({
  user: UserReducer,
  tours: ToursReducer,
  selectedTour: SelectedTour,
  TourVisibilityFilter
});

export default rootReducer;
