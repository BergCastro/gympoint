import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
  updatePlanoSuccess,
  createPlanoSuccess,
  cleanCurrentPlano,
  removePlanoSuccess,
} from './actions';
export function* updatePlano({ payload }) {
  const plano = payload.data;
  console.log(plano);
  try {
    const response = yield call(api.put, `packages/${plano.id}`, plano);
    toast.success('Plano atualizado com sucesso!');
    console.log(response.data);
    yield put(updatePlanoSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar o plano, confira os dados!');
  }
}

export function* createPlano({ payload }) {
  const plano = payload;
  console.log(plano);

  try {
    const response = yield call(api.post, 'packages', plano);
    toast.success('Plano criado com sucesso!');
    history.push('/planos');
    yield put(createPlanoSuccess(response.data));
    yield put(cleanCurrentPlano());
  } catch (err) {
    toast.error('Erro ao tentar criar o plano, confira os dados!');
  }
}

export function* removePlano({ payload }) {
  const plano = payload;
  console.log(plano);

  try {
    const response = yield call(api.delete, `packages/${plano.id}`);
    yield put(removePlanoSuccess(plano));
    toast.success('Plano removido com sucesso!');
    history.push('/planos');
  } catch (err) {
    toast.error('Erro ao tentar remover o plano, confira os dados!');
  }
}

export default all([
  takeLatest('@plano/UPDATE_PLANO_REQUEST', updatePlano),
  takeLatest('@plano/CREATE_PLANO_REQUEST', createPlano),
  takeLatest('@plano/REMOVE_PLANO_REQUEST', removePlano),
]);
