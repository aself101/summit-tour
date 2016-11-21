/*
  Alexander Self
  9/28/16
  Tour application
  sidenav.js: Side navagation; currently displays internal links
*/
import React from 'react';
import { LINKS } from './data';

const SideNav = (props) => {
  const { user, email } = props;
  return (
    <ul id="slide-out" className="side-nav">
      <li>
        <div className="userView">
          <img className="background" src="img/blue-moon.png" />
          <a href="#!user"><img className="circle" src="" /></a>
          <a href="#!name">
            <span className="white-text name">{user}</span>
          </a>
          <a href="#!email">
            <span className="white-text email">{email}</span>
          </a>
        </div>
      </li>
      {
        LINKS.map((l) => (
          <li key={l.href}><a href={l.href} className="waves-effect"><i className="material-icons">{l.icon}</i>{l.name}</a></li>
        ))
      }
      <li><div className="divider"></div></li>
    </ul>
  );
};

export default SideNav;
