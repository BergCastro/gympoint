import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import aluno from './aluno/reducer';
import plano from './plano/reducer';
import matricula from './matricula/reducer';
import pedido from './pedido/reducer';

export default combineReducers({
  auth,
  user,
  aluno,
  plano,
  matricula,
  pedido,
});
