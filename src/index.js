import React from 'react';
import ReactDom from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import foo from './reducers/foo/index';
import FooCreate from './components/foo/Create';
import FooList from './components/foo/List';

const store = createStore(
  combineReducers({foo, form}),
  applyMiddleware(thunk),
);

ReactDom.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact={true} path='/foos' component={FooList}/>
        <Route exact={true} path='/foos/create' component={FooCreate}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
