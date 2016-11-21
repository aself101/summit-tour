/*
  Alexander Self
  9/28/16
  Tour application
  AssignTourForm.js: Assigns the tour and schedules it
*/

import React from 'react';
import { Input, TextArea, DatePicker, Select, MultiSelect, Radio, Checkboxes, Autocomplete } from './inputs';
import { CHECK_OPTS } from './data';
import { checkStatus } from '../helpers';

const AssignTourForm = ({state, title, assignTour, addTourInfo}) => {
  if (!state) return <span> Nada </span>;
  // Collects all tour information
  const tourInfo = () => {
    let vals = {};
    let reqs = [];
    let tourReq = document.getElementsByName('__TOUREQ__');
    let tourForms = document.getElementsByName('__FORMS__');
    vals.SID = state.main.ID;
    vals.tourSize = $("#__SIZE__").val();
    vals.tourDate = $("#__DATE__").val();
    vals.tourTime = $("#__TTIME__").val();
    vals.tourGuide = $("#__GUIDEX__").val();
    vals.numMinors = $("#__MINORS__").val();
    vals.briefInstructor = $("#__INSTRUCTOR__").val();
    vals.briefLocation = $("#__LOC__").val();
    vals.briefTime = $("#__BTIME__").val();

    for (let i = 0; i < tourReq.length; i++) {
      if ($(`#${tourReq[i].id}:checked`).length > 0) {
        switch($(`label[for=${tourReq[i].id}]`).text()) {
          case "Meals":
            vals.MEALS = '1';
            break;
          case "Lodging":
            vals.LODGING = '1';
            break;
          case "Transportation":
            vals.TRANSPORTATION = '1';
            break;
        }
      } else if ($(`#${tourReq[i].id}:checked`).length <= 0) {
        switch($(`label[for=${tourReq[i].id}]`).text()) {
          case "Meals":
            vals.MEALS = '0';
            break;
          case "Lodging":
            vals.LODGING = '0';
            break;
          case "Transportation":
            vals.TRANSPORTATION = '0';
            break;
        }
      }
    }
    for (let i = 0; i < tourForms.length; i++) {
      if ($(`#${tourForms[i].id}:checked`).length > 0) {
        if ($(`label[for=${tourForms[i].id}]`).text() === "No") vals.signedForms = "0";
        else vals.signedForms = "1";
      }
    }

    vals.tourRequirements = reqs;

    return vals;
  };

  function verifyTour() {
    const status = checkStatus(state);
    if (status) {
      assignTour(state, tourInfo);
    }
    return;
  }

  return (
    <form action="#" onSubmit={(e) => e.preventDefault()}>
      <div className="card z-depth-2">
        <center><h4>{title}</h4></center>
        <hr />
        <div className="row">
          <div className="col s6">
            <DatePicker id={"__DATE__"} label={"Tour Date"} />
            <Input id={"__SIZE__"} label={"Tour Size"} />
            <Input id={"__TTIME__"} label={"Tour Time"}  />
            <Input id={"__GUIDEX__"} label={"Tour Guide"}  />
          </div>
          <div className="col s6">
            <Input id={"__MINORS__"} label={"Number of Minors"}  />
            <Input id={"__INSTRUCTOR__"} label={"Safety Briefing Instructor"} />
            <Input id={"__LOC__"} label={"Safety Briefing Location"} />
            <Input id={"__BTIME__"} label={"Safety Briefing Time"} />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            {"\u00a0"}{"\u00a0"}<label>Have all safety forms been submitted?</label>
            <Radio id={"yesForm"} name={"__FORMS__"} label={"Yes"} value={"1"} />
            <Radio id={"noForm"} name={"__FORMS__"} label={"No"} value={"0"} />
          </div>
          <div className="col s6">
            <label>Tour requires the following:</label>
            <Checkboxes fields={CHECK_OPTS} />
          </div>
        </div>
        <center>
          <button
            className="waves-effect waves-light btn"
            type="button"
            onClick={() => {
              addTourInfo(tourInfo);
            }}>
            <i className="material-icons right">add</i>Add Tour Info
          </button>
          {"\u00a0"}{"\u00a0"}
          <button
            className="waves-effect waves-light btn"
            type="button"
            onClick={() => {
              verifyTour();
            }}>
            <i className="material-icons right">done</i>Assign Tour
          </button>

        </center>
        <br />
      </div>
    </form>
  );
};

export default AssignTourForm;
