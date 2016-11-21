import React, { PropTypes } from 'react';

const Link = (props) => {
  const { children, onClick } = props;

  return (
    <a href="#" className="btn" onClick={(e) => {
      e.preventDefault()
      onClick()
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {  
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
