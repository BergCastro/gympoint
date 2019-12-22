import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import aluno from './aluno/sagas';
import plano from './plano/sagas';
import matricula from './matricula/sagas';

export default function* rootSaga() {
  return yield all([auth, user, aluno, plano, matricula]);
}
