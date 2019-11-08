import produce from 'immer';

const INITIAL_STATE = {
  currentAluno: null,
  alunos: [],
};

export default function aluno(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@aluno/UPDATE_ALUNO_SUCCESS': {
        draft.currentAluno = action.payload;
        break;
      }
      case '@aluno/LOAD_CURRENT_ALUNO': {
        draft.currentAluno = action.payload;
        break;
      }
      case '@aluno/LOAD_ALUNOS': {
        draft.alunos = action.payload;
        break;
      }
      case '@aluno/CREATE_ALUNO_SUCCESS': {
        draft.currentAluno = action.payload;
        break;
      }
      case '@aluno/CLEAN_CURRENT_ALUNO': {
        draft.currentAluno = {};
        break;
      }
      default:
    }
  });
}
