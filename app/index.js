/*
  Alexander Self
  9/28/16
  Summit tour application
  index.js: The entry point for the application. Div id is defined, any jquery functions,
            react render and redux store created
*/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import rootReducer from './reducers/index';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { LINKS } from './components/data';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunkMiddleware)(createStore);

const main = () => {

    $(document).ready(function() {
      $(".button-collapse").sideNav();
      $('ul.tabs').tabs();
      $('select').material_select();
      $('.scrollspy').scrollSpy({scrollOffSet: 50});
      $('.tooltipped').tooltip({delay: 50});
    });

    render(<Navbar logo={'Logo'} app={'Tour App'} />, document.getElementById('navbar'));

    render(
      <Provider store={createStoreWithMiddleware(rootReducer, window.devToolsExtension && window.devToolsExtension())}>
        <Router history={browserHistory} routes={routes} />
      </Provider>,
      document.getElementById('app')
    );

    render(<Footer list={LINKS} />, document.getElementById('foot'));
};

main();
