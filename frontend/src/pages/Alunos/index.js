import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAdd } from 'react-icons/md';

import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';
import {
  loadAlunos,
  loadCurrentAluno,
  cleanCurrentAluno,
  removeAlunoRequest,
} from '~/store/modules/aluno/actions';

export default function Alunos() {
  // const [alunos, setAlunos] = useState([]);
  const alunos = useSelector(state => state.aluno.alunos);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllAlunos() {
      const response = await api.get('students');
      dispatch(loadAlunos(response.data));
      // setAlunos(response.data);
    }

    loadAllAlunos();
  }, [dispatch]);

  function handleNovoAluno() {
    dispatch(cleanCurrentAluno());
    history.push('/aluno/novo');
  }
  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM', às' HH'h' ", { locale: pt });
  }

  function handleEditAluno(aluno) {
    dispatch(loadCurrentAluno(aluno));
    history.push('/aluno/editar');
  }

  function handleRemoveAluno(aluno) {
    dispatch(removeAlunoRequest(aluno));
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <button type="button" onClick={handleNovoAluno}>
          <MdAdd id="btNovo" size={20} color="#fff" />
          CADASTRAR
        </button>
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
            {alunos.map(aluno => (
              <tr key={aluno.id}>
                <td>{aluno.name}</td>
                <td>{aluno.email}</td>
                <td style={{ textAlign: 'center' }}>{aluno.idade}</td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    onClick={() => handleEditAluno(aluno)}
                    style={{ color: '#4D85EE' }}
                  >
                    editar
                  </Link>
                  <Link
                    onClick={() => handleRemoveAluno(aluno)}
                    style={{ color: '#DE3B3B' }}
                  >
                    apagar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
