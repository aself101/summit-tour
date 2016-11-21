/*
  Alexander Self
  9/28/16
  Tour application
  DenyTourForm.js: Denies a tour
*/

import React from 'react';
import { TextArea, Checkboxes, Input } from './inputs';
import { DENY_CHECK_OPTS } from './data';


const DenyTourForm = ({state, title, denyTour}) => {
  if (!state) return <span></span>;
  // Get all data from form and send it to denyTour
  function getDenial() {
    var reasons = [];
    var deny = document.getElementsByName('__DENY__');
    const SID = state.main.ID;
    for (let i = 0; i < deny.length; i++) {
      if ($(`#${deny[i].id}:checkbox:checked`).length > 0) {
        if ($(`label[for=${deny[i].id}]`).text() === 'Other') {
          reasons.push(document.getElementById('otherReason').value);
        } else {
          reasons.push($(`label[for=${deny[i].id}]`).text());
        }
      }
    }
    var r = {
      reasons: reasons,
      comment: document.getElementById('__CMNT__').value,
      ID: SID
    };
    return r;
  }
  // Clear form after submission
  function clear() {
    var deny = document.getElementsByName('__DENY__');
    for (let i = 0; i < deny.length; i++) {
      $(`#${deny[i].id}`).prop("checked", false);
    }
    document.getElementById('__CMNT__').value = '';
    document.getElementById('otherReason').value = '';
  }
  return (
      <div className="card z-depth-2">
        <center><h4>{title}</h4></center>
        <hr />
        <div className="row">
          <div className="col s12">
            <Checkboxes fields={DENY_CHECK_OPTS} />
            <Input id={"otherReason"} label={"Reason"} />
            <TextArea id={"__CMNT__"} label={"Add comment to email"} />
          </div>
        </div>
        <center>
          <button
            className="waves-effect waves-light btn red"
            type="btn"
            onClick={() => {
              denyTour(getDenial);
              clear();
            }}>
            Deny Tour
          </button>
        </center>
        <br />
      </div>
  );
};

export default DenyTourForm;
