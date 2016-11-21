/*
  Navbar at head of project
*/
import React from 'react';
import SideNav from './sidenav';


function Navbar (props) {
  const { logo, app } = props;
  return (
    <header>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">LOGO</a>
            <ul className="right hide-on-med-and-down">
              <li><i className="material-icons button-collapse slide" data-activates="slide-out">assignment_ind</i></li>
              <li>&nbsp;&nbsp;&nbsp;{app}&nbsp;&nbsp;&nbsp;</li>
              <li><a href="/">Home</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <SideNav user={"User"} email={"test@test.com"} />
    </header>
  )
}

export default Navbar;
