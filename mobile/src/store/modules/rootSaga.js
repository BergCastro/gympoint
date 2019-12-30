import { all } from 'redux-saga/effects';

import student from './student/sagas';
import signin from './signin/sagas';

export default function* rootSaga() {
  return yield all([student, signin]);
}
