import produce from 'immer';

const INITIAL_STATE = {
  currentMatricula: {
    student_id: '',
    plan_id: '',
    price: '',
    start_date: new Date(),
    plan: {
      duration: 0,
      price: 0,
    },
  },
  matriculas: [],
  students: [],
  plans: [],
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
      case '@matricula/LOAD_STUDENTS': {
        draft.students = action.payload;
        break;
      }
      case '@matricula/LOAD_PLANS': {
        draft.plans = action.payload;
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
        draft.currentMatricula = {
          student_id: '',
          plan_id: '',
          price: '',
          start_date: new Date(),
          plan: {
            duration: 0,
            price: 0,
          },
        };
        break;
      }
      default:
    }
  });
}
