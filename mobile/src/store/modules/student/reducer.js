import produce from 'immer';

const INITIAL_STATE = {
  student: {},
  checkins: [],
  signed: false,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/SIGN_IN_SUCCESS': {
        draft.student = action.payload.student;
        draft.checkins = action.payload.checkins;
        draft.signed = true;
        draft.loading = false;
        break;
      }

      case '@student/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@student/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
