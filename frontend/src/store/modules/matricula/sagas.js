import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
  updateMatriculaSuccess,
  createMatriculaSuccess,
  cleanCurrentMatricula,
  removeMatriculaSuccess,
} from './actions';

export function* updateMatricula({ payload }) {
  const matricula = payload.data;
  try {
    const response = yield call(
      api.put,
      `enrollments/${matricula.id}`,
      matricula
    );
    toast.success('Matricula atualizada com sucesso!');

    yield put(updateMatriculaSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar o matricula, confira os dados!');
  }
}

export function* createMatricula({ payload }) {
  const matricula = payload;
  try {
    const response = yield call(api.post, 'enrollments', matricula);
    toast.success('Matricula realizada com sucesso!');
    history.push('/matriculas');
    yield put(createMatriculaSuccess(response.data));
    yield put(cleanCurrentMatricula());
  } catch (err) {
    toast.error('Erro ao tentar criar a matricula, confira os dados!');
  }
}

export function* removeMatricula({ payload }) {
  const matricula = payload;

  try {
    yield call(api.delete, `enrollments/${matricula.id}`);
    yield put(removeMatriculaSuccess(matricula));
    toast.success('Matricula removida com sucesso!');
    history.push('/matriculas');
  } catch (err) {
    toast.error('Erro ao tentar remover a matricula, confira os dados!');
  }
}

export default all([
  takeLatest('@matricula/UPDATE_MATRICULA_REQUEST', updateMatricula),
  takeLatest('@matricula/CREATE_MATRICULA_REQUEST', createMatricula),
  takeLatest('@matricula/REMOVE_MATRICULA_REQUEST', removeMatricula),
]);
