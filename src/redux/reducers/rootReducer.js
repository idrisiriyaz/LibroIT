import { combineReducers } from 'redux';
import user from './user';
import cart from './cart';
import bookmark from './bookmark';

export default combineReducers({
	user,
	cart,
	bookmark
});