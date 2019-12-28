export function updatePlanoRequest(data) {
  return {
    type: '@plano/UPDATE_PLANO_REQUEST',
    payload: { data },
  };
}

export function removePlanoRequest(plano) {
  return {
    type: '@plano/REMOVE_PLANO_REQUEST',
    payload: plano,
  };
}

export function removePlanoSuccess(plano) {
  return {
    type: '@plano/REMOVE_PLANO_SUCCESS',
    payload: plano,
  };
}

export function updatePlanoSuccess(plano) {
  return {
    type: '@plano/UPDATE_PLANO_SUCCESS',
    payload: { ...plano },
  };
}

export function createPlanoRequest(plano) {
  return {
    type: '@plano/CREATE_PLANO_REQUEST',
    payload: { ...plano },
  };
}

export function createPlanoSuccess(plano) {
  return {
    type: '@plano/CREATE_PLANO_SUCCESS',
    payload: { ...plano },
  };
}

export function cleanCurrentPlano() {
  return {
    type: '@plano/CLEAN_CURRENT_PLANO',
  };
}

export function loadCurrentPlano(plano) {
  return {
    type: '@plano/LOAD_CURRENT_PLANO',
    payload: { ...plano },
  };
}

export function loadPlanos(planos) {
  return {
    type: '@plano/LOAD_PLANOS',
    payload: planos,
  };
}
