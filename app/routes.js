import React from 'react';
import { Route, IndexRoute } from 'react-router';
import GNApp from './GN_App';
import GSApp from './GS_App';
import Main from './components/main';


export default (
  <Route path="/">
    <IndexRoute component={Main} />
    <Route path="gn" component={GNApp} />
    <Route path="gs" component={GSApp} />
  </Route>
);
