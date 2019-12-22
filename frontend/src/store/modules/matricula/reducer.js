import produce from 'immer';

const INITIAL_STATE = {
  currentMatricula: {},
  matriculas: [],
};

export default function matricula(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@matricula/UPDATE_MATRICULA_SUCCESS': {
        draft.currentMatricula = action.payload;
        break;
      }
      case '@matricula/LOAD_CURRENT_MATRICULA': {
        draft.currentMatricula = action.payload;
        break;
      }
      case '@matricula/LOAD_MATRICULAS': {
        draft.matriculas = action.payload;
        break;
      }
      case '@matricula/CREATE_MATRICULA_SUCCESS': {
        draft.currentMatricula = action.payload;
        break;
      }
      case '@matricula/REMOVE_MATRICULA_SUCCESS': {
        draft.matriculas = draft.matriculas.filter(
          matricula => matricula.id !== action.payload.id
        );
        break;
      }
      case '@matricula/CLEAN_CURRENT_MATRICULA': {
        draft.currentMatricula = {};
        break;
      }
      default:
    }
  });
}
