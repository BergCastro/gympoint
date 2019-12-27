export function updatePedidoRequest(data) {
  return {
    type: '@pedido/UPDATE_PEDIDO_REQUEST',
    payload: { data },
  };
}

export function removePedidoRequest(pedido) {
  return {
    type: '@pedido/REMOVE_PEDIDO_REQUEST',
    payload: pedido,
  };
}

export function removePedidoSuccess(pedido) {
  return {
    type: '@pedido/REMOVE_PEDIDO_SUCCESS',
    payload: pedido,
  };
}

export function updatePedidoSuccess(pedido) {
  return {
    type: '@pedido/UPDATE_PEDIDO_SUCCESS',
    payload: { ...pedido },
  };
}

export function createPedidoRequest(pedido) {
  return {
    type: '@pedido/CREATE_PEDIDO_REQUEST',
    payload: { ...pedido },
  };
}

export function createPedidoSuccess(pedido) {
  return {
    type: '@pedido/CREATE_PEDIDO_SUCCESS',
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
