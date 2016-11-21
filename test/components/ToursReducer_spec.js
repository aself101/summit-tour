import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as types from '../../app/actions';
import { DUMMY_STATE } from '../../app/components/data';
import ToursReducer from '../../app/reducers/reducer_tours';

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}


describe('Tours reducer', () => {
  it('Should return the initial state', () => {

  });
  it('Should return all tours in GN', () => {

  });
  it('Should return an updated list of all tours', () => {


  });
});
