import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updatePedidoSuccess } from './actions';

export function* updatePedido({ payload }) {
  const pedido = payload.data;

  try {
    const response = yield call(
      api.post,
      `/help-orders/${pedido.id}/answer`,
      pedido
    );
    toast.success('Pergunta respondida com sucesso!');

    yield put(updatePedidoSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao responder o pedido, tente novamente!');
  }
}

export default all([takeLatest('@pedido/UPDATE_PEDIDO_REQUEST', updatePedido)]);
