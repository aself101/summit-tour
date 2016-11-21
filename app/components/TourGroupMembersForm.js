/*
  Alexander Self
  9/28/16
  Tour application
  TourGroupMembersForm.js: Tour group members are added; state is passed down and updated via addMember.
                           Members may be deleted as well with deleteMember
*/
import React from 'react';

import { Input, TextArea, DatePicker, Select, MultiSelect, Radio, Checkboxes, Autocomplete } from './inputs';
import { SELECT_OPTS, MEMBER_HEADERS } from './data';
import Table from './Table';


const TourGroupMembersForm = ({state, title, addMember, deleteMember}) => {
  // Pulls the values from the form and packages them in an object to be sent as
  // an action payload; the function is called in the action
  function getMember() {
    return {
      NAME: document.getElementById('__NAME__').value,
      AGE: setAgeValue(document.getElementById('__AGE__').value),
      DISABILITY: document.getElementById('__DISABILITY__').value,
      SID: state.main.ID
    };
  }

  function setAgeValue(age) {
    let placeholder = '1';
    switch (age) {
      case 'Under 18':
        return placeholder;
      case 'Over 18':
        placeholder = '2';
        return placeholder;
      default:
        return placeholder;
    }
  }

  // Clears add tour member form
  function clear() {
    document.getElementById('__NAME__').value = '';
    document.getElementById('__AGE__').value = 'Under 18';
    document.getElementById('__DISABILITY__').value = '';
  }

  return (
      <div className="card z-depth-2">
        <center><h4>{title}</h4></center>
        <hr />
        <div className="row">
          <div className="col s3">
            <Input id={"__NAME__"} label={"Name"} length={"30"} />
          </div>
          <div className="col s3">
            <Select fields={SELECT_OPTS} id={"__AGE__"} label={"Age"} />
          </div>
          <div className="col s3">
            <Input id={"__DISABILITY__"} label={"Special Needs"} length={"30"} />
          </div>
          <div className="col s3">
            <button className="waves-effect waves-light btn" type="button" onClick={() => {addMember(state, getMember); clear();}}>Add</button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Table state={state} headers={MEMBER_HEADERS} onClick={(state, member) => deleteMember(state, member)} />
          </div>
        </div>
        <br />
      </div>
  );
};

export default TourGroupMembersForm;
