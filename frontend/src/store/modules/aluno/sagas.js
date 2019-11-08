import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { updateAlunoSuccess, createAlunoSuccess } from './actions';
export function* updateAluno({ payload }) {
  const aluno = payload.data;
  console.log(aluno);
  try {
    const response = yield call(api.put, `alunos/${aluno.id}`, aluno);
    toast.success('Aluno atualizado com sucesso!');
    console.log(response.data);
    yield put(updateAlunoSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar o aluno, confira os dados!');
  }
}

export function* createAluno({ payload }) {
  const aluno = payload;
  console.log(aluno);

  try {
    const response = yield call(api.post, 'alunos', aluno);
    toast.success('Aluno criado com sucesso!');
    history.push('/alunos');
    yield put(createAlunoSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao tentar criar o aluno, confira os dados!');
  }
}

export default all([
  takeLatest('@aluno/UPDATE_ALUNO_REQUEST', updateAluno),
  takeLatest('@aluno/CREATE_ALUNO_REQUEST', createAluno),
]);
