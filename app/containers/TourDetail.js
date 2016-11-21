import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
/* Actions */
import { updateTours, addTourMember, deleteTourMemberAsync, approveTourAsync,
  denyTourAsync, addCommentAsync, addTourInfoAsync, assignTourAsync } from '../actions/index';
/* Components */
import AssignTourForm from '../components/AssignTourForm';
import DenyTourForm from '../components/DenyTourForm';
import RequiredSignatures from '../components/RequiredSignaturesForm';
import TourGroupMembersForm from '../components/TourGroupMembersForm';
import ContactDetails from '../components/ContactDetails';
import TourDates from '../components/TourDates';
import Status from '../components/status';
import Comments from '../components/Comments';

class TourDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tours: this.props.tours,
      status: null
    };
  }
  componentDidMount() {
    // Quick check if user has been authenticated
    // If not, push to main page to pull user info
    if (Object.keys(this.props.user).length === 0) {
      browserHistory.push('/');
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m9 l10">
            <div id="tourDates" className="section scrollspy">
              <TourDates state={this.props.tour} title={"Tour Dates"} />
            </div>

            <div id="contactDetails" className="section scrollspy">
              <ContactDetails state={this.props.tour} title={"Contact Details"} />
            </div>

            <div id="tourGroup" className="section scrollspy">
              <TourGroupMembersForm
                title={"Tour Group Members"}
                state={this.props.tour}
                addMember={(state, member) => this.props.addMember(state, member)}
                deleteMember={(state, member) => this.props.deleteMember(state, member)}
              />
            </div>

            <div id="assignTour" className="section scrollspy">
                <AssignTourForm
                  state={this.props.tour}
                  title={"Assign Tour"}
                  assignTour={(tour, tourInfo) => this.props.assignTour(tour, tourInfo)}
                  addTourInfo={(tourInfo) => this.props.addTourInfo(tourInfo)}
                />
            </div>

            <div id="denyTour" className="section scrollspy">
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <DenyTourForm
                  title={"Deny Tour"}
                  state={this.props.tour}
                  denyTour={(reason) => this.props.denyTour(reason)}
                />
              </form>
            </div>
            <div id="comments" className="section scrollspy">
              <Comments
                state={this.props.tour}
                title={"Comments"}
                user={this.props.user}
                addComment={(comment) => this.props.addComment(comment)}
              />
            </div>
          </div>
          <div id="right-menu" className="col hide-on-small-only m3 l2">
            <ul className="section table-of-contents">
              <li><a href="#tourDates">Tour Dates</a></li>
              <li><a href="#contactDetails">Contact Details</a></li>
              <li><a href="#tourGroup">Tour Group Members</a></li>
              <li><a href="#assignTour">Assign Tour</a></li>
              <li><a href="#denyTour">Deny Tour</a></li>
              <li><a href="#comments">Comments</a></li>
            </ul>
            <hr />
              <Status state={this.props.tour} />
            <hr />
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <RequiredSignatures state={this.props.tour} approveTour={(approver) => this.props.approveTour(approver)} />
            </form>
            <button className="btn-large" onClick={() => this.props.updateTours(this.props.tour, this.props.tours)}>Back</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tour: state.selectedTour,
    tours: state.tours,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateTours: updateTours,
    addMember: addTourMember,
    deleteMember: deleteTourMemberAsync,
    approveTour: approveTourAsync,
    denyTour: denyTourAsync,
    assignTour: assignTourAsync,
    addComment: addCommentAsync,
    addTourInfo: addTourInfoAsync
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TourDetail);






























/* END */
