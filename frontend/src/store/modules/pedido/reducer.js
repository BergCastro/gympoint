import produce from 'immer';

const INITIAL_STATE = {
  currentPedido: {},
  pedidos: [],
};

export default function pedido(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@pedido/UPDATE_PEDIDO_SUCCESS': {
        draft.currentPedido = action.payload;
        break;
      }
      case '@pedido/LOAD_CURRENT_PEDIDO': {
        draft.currentPedido = action.payload;
        break;
      }
      case '@pedido/LOAD_PEDIDOS': {
        draft.pedidos = action.payload;
        break;
      }
      case '@pedido/CREATE_PEDIDO_SUCCESS': {
        draft.currentPedido = action.payload;
        break;
      }
      case '@pedido/REMOVE_PEDIDO_SUCCESS': {
        draft.pedidos = draft.pedidos.filter(p => p.id !== action.payload.id);
        break;
      }
      case '@pedido/CLEAN_CURRENT_PEDIDO': {
        draft.currentPedido = {};
        break;
      }
      default:
    }
  });
}
