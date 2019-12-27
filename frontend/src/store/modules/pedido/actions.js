export function updatePedidoRequest(data) {
  return {
    type: '@pedido/UPDATE_PEDIDO_REQUEST',
    payload: { data },
  };
}

export function updatePedidoSuccess(pedido) {
  return {
    type: '@pedido/UPDATE_PEDIDO_SUCCESS',
    payload: { ...pedido },
  };
}

export function cleanCurrentPedido() {
  return {
    type: '@pedido/CLEAN_CURRENT_PEDIDO',
  };
}

export function loadCurrentPedido(pedido) {
  return {
    type: '@pedido/LOAD_CURRENT_PEDIDO',
    payload: { ...pedido },
  };
}

export function loadPedidos(pedidos) {
  return {
    type: '@pedido/LOAD_PEDIDOS',
    payload: pedidos,
  };
}
