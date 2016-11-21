/*
  Alexander Self
  9/28/16
  Tour application
  ContactDetails.js: Displays contact details for the tour
*/
import React from 'react';
import utf8 from 'utf8';

const ContactDetails = ({state, title}) => {
  if (!state) return <span> Nada </span>;

  const HEADERS = [
    { key: 'pointOfContact', header: 'Point of Contact' },
    { key: 'contactInfo', header: 'Contact Information' }
  ];
  const DATA = [
    { label: 'Name', state: utf8.decode(state.main.pocName) },
    { label: 'Email', state: utf8.decode(state.main.pocEmail) },
    { label: 'Mobile Phone', state: state.main.pocMobile },
    { label: 'Organization Name', state: utf8.decode(state.main.organizationName) },
    { label: 'Organization Details', state: utf8.decode(state.main.organizationDetails) },
    { label: 'Other Information', state: utf8.decode(state.main.otherInformation) }
  ];

  return (
    <div className="card z-depth-2">
      <center><h4>{title}</h4></center>
      <hr />
      <table className="highlight">
        <thead>
          <tr>
            {
              HEADERS.map(h => (
                <th key={h.key}>{h.header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
            {
              DATA.map((s) => (
                  <tr key={s.label}><td><b>{s.label}</b></td><td>{s.state}</td></tr>
              ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default ContactDetails;
