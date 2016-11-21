import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import * as actions from '../../app/actions';
import { DUMMY_STATE } from '../../app/components/data';

const { renderIntoDocument,
        scryRenderedDOMComponentsWithTag } = TestUtils;
describe('Tour Actions', () => {
  it('Fetches all tours', () => {

  });
  it('Selects a single tour', () => {
    
  });
  it('Updates tour state tree', () => {

  });
  it('Adds a member to the tour', () => {

  });
  it('Deletes a member from the tour', () => {

  });
  it('Approves of a tour', () => {

  });
  it('Sets the visibility filter on the tours', () => {

  });
  it("Deny's a tour", () => {
    const tour = DUMMY_STATE[5];
    const reason = () => {
      return {
        reasons: ['Not enough time'],
        comment: 'Cannot do it'
      }
    };
    const expectedAction = {
      type: actions.DENY_TOUR,
      tour: tour,
      payload: reason()
    };
    expect(actions.denyTour(tour, reason)).toEqual(expectedAction);
  });
  it("Assign's a tour", () => {

  });
});






























/* END */
