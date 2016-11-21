import { connect } from 'react-redux';
import { setTableVisibilityFilter } from '../actions';
import Tab from '../components/tab';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
    href: ownProps.href,
    text: ownProps.text
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setTableVisibilityFilter(ownProps.filter))
    }
  };
};

const TabFilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

export default TabFilterLink;
