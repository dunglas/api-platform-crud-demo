import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux'

import foo from './reducers/foo/';
import FooList from './components/foo/List';
import FooCreate from './components/foo/Create';
import FooUpdate from './components/foo/Update';

const store = createStore(
  combineReducers({routing, form, foo}),
  applyMiddleware(thunk),
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDom.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact={true} path='/foos' component={FooList}/>
        <Route exact={true} path='/foos/create' component={FooCreate}/>
        <Route exact={true} path='/foos/edit/:id' component={FooUpdate}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
