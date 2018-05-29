import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages';

// bundle these reducers into a single root reducer
const rootReducer = combineReducers({
  currentUser,
  errors,
  messages
});

export default rootReducer;