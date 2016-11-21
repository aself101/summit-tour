/*
  Alexander Self
  9/28/16
  Tour application
  status.js: Displays status of the tour, if Scheduled -> display Notifiy
*/
import React from 'react';
import Notify from './notify';
import { getStatus } from '../helpers';

const Status = ({ state, cancelTour, notifyTour }) => {
  if (!state) return <span></span>;
  let status = state.main.STATUS;
  let reasons;
  let notify;
  if (status === "3") { // AKA Status is Denied
    $(`#getStatus`).removeClass("approve").addClass("deny");
    reasons = state.main.denialReasons.map((reason) => {
      return <li key={reason} className="collection-item deny">{reason}</li>;
    });
  } else if (status === "2") {
    notify = <Notify cancelTour={cancelTour} notifyTour={notifyTour} />;
  }

  else $(`#getStatus`).removeClass("deny").addClass("approve");

  return (
    <div>
      <h5>Status: <span id="getStatus" className="approve">{ getStatus(status) }</span></h5>
      <ul className="collection">
        { reasons }
      </ul>
      <div>
        { notify }
      </div>
    </div>
  );
};

export default Status;
