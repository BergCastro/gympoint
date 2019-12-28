import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAdd } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container, ButtonAction } from './styles';
import {
  loadMatriculas,
  loadPlans,
  loadStudents,
  loadCurrentMatricula,
  cleanCurrentMatricula,
  removeMatriculaRequest,
} from '~/store/modules/matricula/actions';

export default function Matriculas() {
  const matriculas = useSelector(state => state.matricula.matriculas);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllMatriculas() {
      const response = await api.get('enrollments');
      const responseStudents = await api.get('students');
      const responsePlanos = await api.get('packages');

      dispatch(loadMatriculas(response.data));
      dispatch(loadPlans(responsePlanos.data));
      dispatch(loadStudents(responseStudents.data));
    }

    loadAllMatriculas();
  }, [dispatch]);

  function handleNovoMatricula() {
    dispatch(cleanCurrentMatricula());
    history.push('/matricula/novo');
  }
  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM' de 'yyyy", { locale: pt });
  }

  function handleEditMatricula(matricula) {
    dispatch(loadCurrentMatricula(matricula));
    history.push('/matricula/editar');
  }

  function handleRemoveMatricula(matricula) {
    const confirmed = window.confirm(
      'Está certo que quer remover a matrícula?'
    );
    if (confirmed) dispatch(removeMatriculaRequest(matricula));
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando matrículas</strong>
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
              <th />
            </tr>
          </thead>
          <tbody>
            {matriculas.length > 0 ? (
              matriculas.map(matricula => (
                <tr key={matricula.id}>
                  <td>{matricula.student.name}</td>
                  <td>{matricula.plan.title}</td>

                  <td style={{ textAlign: 'center' }}>
                    {formatDate(matricula.start_date)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {formatDate(matricula.end_date)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <IoIosCheckmarkCircle
                      size={20}
                      color={
                        matricula.enrollment_enable === true ? 'green' : '#ccc'
                      }
                    />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <ButtonAction
                      onClick={() => handleEditMatricula(matricula)}
                      style={{ color: '#4D85EE' }}
                    >
                      editar
                    </ButtonAction>
                    <ButtonAction
                      onClick={() => handleRemoveMatricula(matricula)}
                      style={{ color: '#DE3B3B' }}
                    >
                      apagar
                    </ButtonAction>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
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
