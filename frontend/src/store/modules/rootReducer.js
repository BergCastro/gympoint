import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import aluno from './aluno/reducer';

export default combineReducers({
  auth,
  user,
  aluno,
});
