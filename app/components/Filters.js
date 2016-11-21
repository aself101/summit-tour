/*
  Alexander Self
  9/28/16
  Tour application
  Filters.js: filters tours based on their status
*/
import React from 'react';
import FilterLink from '../containers/FiltersLink';

const Filters = () => {
  return (
    <div className="row">
      <div className="col s2"></div>
      <div className="col s2">
        <FilterLink filter="SHOW_ALL">
          All
        </FilterLink>
      </div>
      <div className="col s2">
        <FilterLink filter="SHOW_NEW">
          New
        </FilterLink>
      </div>
      <div className="col s2">
        <FilterLink filter="SHOW_PENDING">
          Pending
        </FilterLink>
      </div>
      <div className="col s2">
        <FilterLink filter="SHOW_APPROVED">
          Approved
        </FilterLink>
      </div>
      <div className="col s2"></div>
    </div>
  );
};

export default Filters;
