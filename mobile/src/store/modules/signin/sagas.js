import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `students/${id}/checkins`);

    yield put(signInSuccess(response.data));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na identificação do ID',
      'Verifique o ID digitado e tente novamente!'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@signin/SIGN_IN_REQUEST', signIn)]);
