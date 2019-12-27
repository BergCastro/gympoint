import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
  updatePedidoSuccess,
  createPedidoSuccess,
  cleanCurrentPedido,
  removePedidoSuccess,
} from './actions';

export function* updatePedido({ payload }) {
  const pedido = payload.data;

  try {
    const response = yield call(api.put, `packages/${pedido.id}`, pedido);
    toast.success('Pedido atualizado com sucesso!');

    yield put(updatePedidoSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar o pedido, confira os dados!');
  }
}

export function* createPedido({ payload }) {
  const pedido = payload;

  try {
    const response = yield call(api.post, 'packages', pedido);
    toast.success('Pedido criado com sucesso!');
    history.push('/pedidos');
    yield put(createPedidoSuccess(response.data));
    yield put(cleanCurrentPedido());
  } catch (err) {
    toast.error('Erro ao tentar criar o pedido, confira os dados!');
  }
}

export function* removePedido({ payload }) {
  const pedido = payload;

  try {
    yield call(api.delete, `packages/${pedido.id}`);
    yield put(removePedidoSuccess(pedido));
    toast.success('Pedido removido com sucesso!');
    history.push('/pedidos');
  } catch (err) {
    toast.error('Erro ao tentar remover o pedido, confira os dados!');
  }
}

export default all([
  takeLatest('@pedido/UPDATE_PEDIDO_REQUEST', updatePedido),
  takeLatest('@pedido/CREATE_PEDIDO_REQUEST', createPedido),
  takeLatest('@pedido/REMOVE_PEDIDO_REQUEST', removePedido),
]);
