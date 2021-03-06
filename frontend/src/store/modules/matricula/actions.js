export function updateMatriculaRequest(data) {
  return {
    type: '@matricula/UPDATE_MATRICULA_REQUEST',
    payload: { data },
  };
}

export function removeMatriculaRequest(matricula) {
  return {
    type: '@matricula/REMOVE_MATRICULA_REQUEST',
    payload: matricula,
  };
}

export function removeMatriculaSuccess(matricula) {
  return {
    type: '@matricula/REMOVE_MATRICULA_SUCCESS',
    payload: matricula,
  };
}

export function updateMatriculaSuccess(matricula) {
  return {
    type: '@matricula/UPDATE_MATRICULA_SUCCESS',
    payload: { ...matricula },
  };
}

export function createMatriculaRequest(matricula) {
  return {
    type: '@matricula/CREATE_MATRICULA_REQUEST',
    payload: { ...matricula },
  };
}

export function createMatriculaSuccess(matricula) {
  return {
    type: '@matricula/CREATE_MATRICULA_SUCCESS',
    payload: { ...matricula },
  };
}

export function cleanCurrentMatricula() {
  return {
    type: '@matricula/CLEAN_CURRENT_MATRICULA',
  };
}

export function loadCurrentMatricula(matricula) {
  return {
    type: '@matricula/LOAD_CURRENT_MATRICULA',
    payload: { ...matricula },
  };
}

export function loadMatriculas(matriculas) {
  return {
    type: '@matricula/LOAD_MATRICULAS',
    payload: matriculas,
  };
}
export function loadStudents(students) {
  return {
    type: '@matricula/LOAD_STUDENTS',
    payload: students,
  };
}
export function loadPlans(plans) {
  return {
    type: '@matricula/LOAD_PLANS',
    payload: plans,
  };
}
