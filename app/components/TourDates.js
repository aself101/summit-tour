import React from 'react';
import { firstCharToUpper, getStatus } from '../helpers';


const TourDates = ({state, title}) => {
  if (!state) return <span> {title} </span>;

  const HEADERS = [
    { key: 'type', header: 'Type' },
    { key: 'start', header: 'Start' },
    { key: 'end', header: 'End' },
    { key: 'time', header: 'Time' },
    { key: 'flexible', header: 'Flexible' }
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
            <tr>
              <td>{firstCharToUpper(state.main.TYPE)}</td>
              <td>{state.main.dateStart}</td>
              <td>{state.main.dateEnd}</td>
              <td>{state.main.TIME}</td>
              <td>{state.main.dateFlexible}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TourDates;
