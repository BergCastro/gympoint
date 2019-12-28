import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import api from '~/services/api';
import { Container, ButtonAction } from './styles';
import {
  loadAlunos,
  loadCurrentAluno,
  cleanCurrentAluno,
  removeAlunoRequest,
} from '~/store/modules/aluno/actions';

export default function Alunos() {
  const alunos = useSelector(state => state.aluno.alunos);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllAlunos() {
      const response = await api.get(`students?q=${search}`);
      dispatch(loadAlunos(response.data));
      // setAlunos(response.data);
    }

    loadAllAlunos();
  }, [dispatch, search]);

  function handleNovoAluno() {
    dispatch(cleanCurrentAluno());
    history.push('/aluno/novo');
  }

  function handleEditAluno(aluno) {
    dispatch(loadCurrentAluno(aluno));
    history.push('/aluno/editar');
  }

  function handleRemoveAluno(aluno) {
    dispatch(removeAlunoRequest(aluno));
  }

  function handleChangeSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button" onClick={handleNovoAluno}>
            <MdAdd id="btNovo" size={20} color="#fff" />
            CADASTRAR
          </button>
          <input onChange={handleChangeSearch} placeholder="Buscar aluno" />
        </div>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>EMAIL</th>
              <th style={{ textAlign: 'center' }}>IDADE</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {alunos.length > 0 ? (
              alunos.map(aluno => (
                <tr key={aluno.id}>
                  <td>{aluno.name}</td>
                  <td>{aluno.email}</td>
                  <td style={{ textAlign: 'center' }}>{aluno.idade}</td>
                  <td style={{ textAlign: 'right' }}>
                    <ButtonAction
                      onClick={() => handleEditAluno(aluno)}
                      style={{ color: '#4D85EE' }}
                    >
                      editar
                    </ButtonAction>
                    <ButtonAction
                      onClick={() => handleRemoveAluno(aluno)}
                      style={{ color: '#DE3B3B' }}
                    >
                      apagar
                    </ButtonAction>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  Nenhum resultado foi encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
