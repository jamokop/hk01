import { combineReducers } from 'redux';
import message from './message';
import loading from './loading';

const payment = combineReducers({
  message,
  loading
});

export default payment;