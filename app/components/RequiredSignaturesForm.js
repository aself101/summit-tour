/*
  Alexander Self
  9/28/16
  Tour application
  RequiredSignaturesForm.js: List of buttons that are required for tours; activate status New -> Pending
*/
import React from 'react';

const RequiredSignatures = ({ state, approveTour }) => {
  if (!state) return <span> Nada </span>;

  // Unique Ids given to each button generated per tour
  let PIO = `PIO_${state.main.ID}`;
  let Science = `Science_${state.main.ID}`;
  let EngOps = `EngOps_${state.main.ID}`;

  var pio = false,
      science = false,
      engops = false;

  function determineSignatures(state) {
    const sigs = state.signatures;
    for (var i = 0; i < sigs.length; i++) {
      if (sigs[i].DEPT === 'EngOps' && sigs[i].STATUS === '0') continue;
      else if (sigs[i].DEPT === 'EngOps' && sigs[i].STATUS === '1') engops = true;
      else if (sigs[i].DEPT === 'Science' && sigs[i].STATUS === '0') continue;
      else if (sigs[i].DEPT === 'Science' && sigs[i].STATUS === '1') science = true;
      else if (sigs[i].DEPT === 'PIO' && sigs[i].STATUS === '0') continue;
      else if (sigs[i].DEPT === 'PIO' && sigs[i].STATUS === '1') pio = true;
    }
  }

  function getSignature(e) {
    return {
      SID: state.main.ID,
      GUID: e.target.id, // To be fixed later
      STATUS: '1',
      DEPT: e.target.id.split('_')[0]
    }
  }

  determineSignatures(state);

  return (
    <div className="card">
      <center><b>Required Signatures</b></center>
      <ul className="collection">
        <li className="collection-item">
          <div className="row">
            <div className="col s4">
              PIO
            </div>
            <div className="col s8">
              <button id={PIO}
                className={`waves-effect waves-teal btn white approvals z-depth-2`}
                onClick={(e) => approveTour(getSignature(e))}>
                Approve
              </button>
            </div>
          </div>
          <div className="approve">
            <h5><b>{ pio ? 'Approved' : null }</b></h5>
          </div>
        </li>
        <li className="collection-item">
          <div className="row">
            <div className="col s4">
              Science
            </div>
            <div className="col s8">
              <button id={Science}
                className="waves-effect waves-teal btn white approvals z-depth-2"
                onClick={(e) => approveTour(getSignature(e))}>
                Approve
              </button>
            </div>
          </div>
          <div className="approve">
            <h5><b>{ science ? 'Approved' : null }</b></h5>
          </div>
        </li>
        <li className="collection-item">
          <div className="row">
            <div className="col s4">
              EngOps
            </div>
            <div className="col s8">
              <button id={EngOps} className="waves-effect waves-teal btn white approvals z-depth-2"
                onClick={(e) => approveTour(getSignature(e))}>
                Approve
              </button>
            </div>
          </div>
          <div className="approve">
            <h5><b>{ engops ? 'Approved' : null }</b></h5>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RequiredSignatures;


/* END */
