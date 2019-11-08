import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import {
  MdKeyboardArrowRight,
  MdControlPoint,
  MdAdd,
  MdEvent,
  MdRoom,
} from 'react-icons/md';

import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container, Aluno } from './styles';
import {
  loadAlunos,
  loadCurrentAluno,
  cleanCurrentAluno,
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
  }, []);

  function handleNovoAluno() {
    dispatch(cleanCurrentAluno());
    history.push('/newAluno');
  }
  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM', às' HH'h' ", { locale: pt });
  }

  function handleEditAluno(aluno) {
    //aluno.date = formatDate(aluno.date);
    dispatch(loadCurrentAluno(aluno));
    history.push('/editAluno');
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
          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th style={{ textAlign: 'center' }}>IDADE</th>
            <th></th>
          </tr>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.name}</td>
              <td>{aluno.email}</td>
              <td style={{ textAlign: 'center' }}>{aluno.idade}</td>
              <td style={{ textAlign: 'right' }}>
                <Link onClick={() => handleEditAluno(aluno)}>editar</Link>
                <Link>apagar</Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Container>
  );
}
