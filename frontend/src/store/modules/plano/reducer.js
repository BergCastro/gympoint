import produce from 'immer';

const INITIAL_STATE = {
  currentPlano: {},
  planos: [],
};

export default function plano(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plano/UPDATE_PLANO_SUCCESS': {
        draft.currentPlano = action.payload;
        break;
      }
      case '@plano/LOAD_CURRENT_PLANO': {
        draft.currentPlano = action.payload;
        break;
      }
      case '@plano/LOAD_PLANOS': {
        draft.planos = action.payload;
        break;
      }
      case '@plano/CREATE_PLANO_SUCCESS': {
        draft.currentPlano = action.payload;
        break;
      }
      case '@plano/REMOVE_PLANO_SUCCESS': {
        draft.planos = draft.planos.filter(
          plano => plano.id !== action.payload.id
        );
        break;
      }
      case '@plano/CLEAN_CURRENT_PLANO': {
        draft.currentPlano = {};
        break;
      }
      default:
    }
  });
}
