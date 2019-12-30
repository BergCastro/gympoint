import { combineReducers } from 'redux';

import student from './student/reducer';
import signin from './signin/reducer';

export default combineReducers({
  student,
  signin,
});
