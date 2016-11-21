/*
  Materialize CSS Components
  http://materializecss.com/

  Alexander Self, 2016
  

  Components created are based on the html arragement and css className names defined in
  the materializecss docs
*/


import React, { Component } from 'react';

/******************* Text Input ********************/
export const Input = ({id, label, length}) => {
  return (
    <div className="col s12">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" className="validate" maxLength={length} />
    </div>
  );
};


/******************* TextArea Input ********************/
export const TextArea = ({id, label}) => {

  return (
    <div className="input-field col s12">
      <textarea id={id} className="materialize-textarea" maxLength="300"></textarea>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};


/******************* Date Input ********************/
export const DatePicker = ({ id, label, value }) => {
    // Lifts form label if value exists
    if (value) $(`label[for="${id}"]`).addClass("active");

    let onClick = () => {
      $(`#${id}`).pickadate({
        selectYears: 150,
        format: 'yyyy-mm-dd'
      });
    };

    return (
      <div className="col s12">
        <label htmlFor={id}>{label}</label>
        <input id={id} type="text" className="datepicker" onClick={onClick} />
      </div>
    );
};


/******************* Radio Array Input ********************/
export const Radio = ({name, id, label, value}) => {
  return (
    <p>
      <input name={name} type="radio" id={id} value={value} />
      <label htmlFor={id}>{label}</label>
    </p>
  );
};


/******************* Checkbox Array Input ********************/
export const Checkboxes = ({fields}) => {
  const Options = fields.map(f => (
    <p key={f.id}>
      <input name={f.name} type="checkbox" id={f.id} />
      <label htmlFor={f.id}>{f.label}</label>
    </p>
  ));
  return (
    <div className="col s12">
      {Options}
    </div>
  );
};


/******************* Select Array Input ********************/
export const Select = ({id, label, fields}) => {
  const Options = fields.map(f => (
    <option key={f.val} value={f.val}>{f.option}</option>
  ));

  return (
    <div className="input-field col s12">
      <select id={id}>
        <option defaultValue="" disabled>Choose your option</option>
        {Options}
      </select>
      <label>{label}</label>
    </div>
  );
};


/******************* MultiSelect Array Input ********************/
export const MultiSelect = ({id, label, fields}) => {
  const Options = fields.map(f => (
    <option key={f.val} value={f.val}>{f.option}</option>
  ));

  return (
    <div className="input-field col s12">
      <select multiple id={id}>
        <option defaultValue="" disabled>Choose your options</option>
        {Options}
      </select>
      <label>{label}</label>
    </div>
  );
};

/******************* Text Input Autocomplete ********************/
export const Autocomplete = ({id, label, data}) => {
  let clicked = false;
  // Initialize if unclicked
  let onClick = () => {
    if (!clicked) {
      $(`input.autocomplete`).autocomplete({
        data: data
      });
      clicked = !clicked;
    }
    return;
  };

  return (
    <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">textsms</i>
            <input type="text" id={id} className="autocomplete" onClick={onClick} />
            <label htmlFor={id}>{label}</label>
          </div>
        </div>
      </div>
    </div>
  )
};

class Button extends Component {
  constructor(props) {super(props)}
  render() {
    return (
      <button className="waves-effect waves-light btn" onClick={this.props.onClick}>
        <i className="material-icons left">{this.props.icon}</i>
        {this.props.title}
      </button>
    );
  }
}

export default Button;





















/* END */
