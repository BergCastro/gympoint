export function signInRequest(id, navigation) {
  return {
    type: '@signin/SIGN_IN_REQUEST',
    payload: { id, navigation },
  };
}

export function signInSuccess(data) {
  return {
    type: '@signin/SIGN_IN_SUCCESS',
    payload: { ...data },
  };
}

export function signFailure() {
  return {
    type: '@signin/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@signin/SIGN_OUT',
  };
}
