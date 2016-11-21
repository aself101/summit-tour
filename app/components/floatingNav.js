/*
  Alexander Self
  9/28/16
  Tour application
  floatingNav.js: Navigates between GN, GS tours and home
*/

import React from 'react';
import { Link } from 'react-router';


const ButtonNav = () => {
  return (
    <div className="fixed-action-btn horizontal click-to-toggle button-nav">
      <a className="btn-floating btn-large">
        <i className="large material-icons">reorder</i>
      </a>
      <ul>
        <li><Link to="/" className="btn-floating btn-large red navlink">Home</Link></li>
        <li><Link to="/gn" className="btn-floating btn-large blue navlink">GN</Link></li>
        <li><Link to="/gs" className="btn-floating btn-large green navlink">GS</Link></li>
      </ul>
    </div>
  );
};

export default ButtonNav;













































/* END */
