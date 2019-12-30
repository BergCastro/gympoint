import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  loading: false,
  currentStudent: {},
};

export default function signin(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@signin/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@signin/SIGN_IN_SUCCESS': {
        draft.signed = true;
        draft.loading = false;
        draft.currentStudent = action.payload.student;
        break;
      }

      case '@signin/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@signin/SIGN_OUT': {
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
