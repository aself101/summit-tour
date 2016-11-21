/*
  Notify applicant of emergency cancel or that tour has been approved and scheduled

*/
import React from 'react';
import { TextArea } from './inputs';

const Notify = ({cancelTour, notifyTour}) => {
  return (
    <div>
      <TextArea id={"notify-applicant"} label={"Add to Email"} />
      <div className="row">
        <div className="col s6">
          <button className="btn waves-effect waves-teal btn">Notify Applicant</button>
        </div>
        <div className="col s6">
          <button className="btn waves-effect waves-teal btn red">Emergency Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Notify;







































/* END */
