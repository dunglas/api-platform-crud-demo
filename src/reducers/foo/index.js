import { combineReducers } from 'redux';
import list from './list';
import create from './create';
import update from './update';

export default combineReducers({list, create, update});
