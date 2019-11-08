export function updateAlunoRequest(data) {
  return {
    type: '@aluno/UPDATE_ALUNO_REQUEST',
    payload: { data },
  };
}

export function updateAlunoSuccess(aluno) {
  return {
    type: '@aluno/UPDATE_ALUNO_SUCCESS',
    payload: { ...aluno },
  };
}

export function createAlunoRequest(aluno) {
  return {
    type: '@aluno/CREATE_ALUNO_REQUEST',
    payload: { ...aluno },
  };
}

export function createAlunoSuccess(aluno) {
  return {
    type: '@aluno/CREATE_ALUNO_SUCCESS',
    payload: { ...aluno },
  };
}

export function cleanCurrentAluno(aluno) {
  return {
    type: '@aluno/CLEAN_CURRENT_ALUNO',
  };
}

export function loadCurrentAluno(aluno) {
  return {
    type: '@aluno/LOAD_CURRENT_ALUNO',
    payload: { ...aluno },
  };
}

export function loadAlunos(alunos) {
  return {
    type: '@aluno/LOAD_ALUNOS',
    payload: alunos,
  };
}
