import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAdd } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';
import {
  loadMatriculas,
  loadCurrentMatricula,
  cleanCurrentMatricula,
  removeMatriculaRequest,
} from '~/store/modules/matricula/actions';

export default function Matriculas() {
  // const [matriculas, setMatriculas] = useState([]);
  const matriculas = useSelector(state => state.matricula.matriculas);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllMatriculas() {
      const response = await api.get('enrollments');
      dispatch(loadMatriculas(response.data));
      // setMatriculas(response.data);
      console.log('teste data', new Date());
    }

    loadAllMatriculas();
  }, []);

  function handleNovoMatricula() {
    dispatch(cleanCurrentMatricula());
    history.push('/matricula/novo');
  }
  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM', às' HH'h' ", { locale: pt });
  }

  function handleEditMatricula(matricula) {
    dispatch(loadCurrentMatricula(matricula));
    history.push('/matricula/editar');
  }

  function handleRemoveMatricula(matricula) {
    dispatch(removeMatriculaRequest(matricula));
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando matriculas</strong>
        <button type="button" onClick={handleNovoMatricula}>
          <MdAdd id="btNovo" size={20} color="#fff" />
          CADASTRAR
        </button>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th style={{ textAlign: 'center' }}>INÍCIO</th>
              <th style={{ textAlign: 'center' }}>TÉRMINO</th>
              <th style={{ textAlign: 'center' }}>ATIVA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map(matricula => (
              <tr key={matricula.id}>
                <td>{matricula.student.name}</td>
                <td>{matricula.plan.title}</td>

                <td style={{ textAlign: 'center' }}>{matricula.start_date}</td>
                <td style={{ textAlign: 'center' }}>{matricula.end_date}</td>
                <td style={{ textAlign: 'center' }}>
                  <IoIosCheckmarkCircle
                    size={20}
                    color={
                      matricula.enrollment_enable === true ? 'green' : '#ccc'
                    }
                  />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    onClick={() => handleEditMatricula(matricula)}
                    style={{ color: '#4D85EE' }}
                  >
                    editar
                  </Link>
                  <Link
                    onClick={() => handleRemoveMatricula(matricula)}
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
