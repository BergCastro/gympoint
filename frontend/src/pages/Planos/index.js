import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAdd } from 'react-icons/md';

import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';
import {
  loadPlanos,
  loadCurrentPlano,
  cleanCurrentPlano,
  removePlanoRequest,
} from '~/store/modules/plano/actions';

export default function Planos() {
  // const [planos, setPlanos] = useState([]);
  const planos = useSelector(state => state.plano.planos);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllPlanos() {
      const response = await api.get('packages');
      dispatch(loadPlanos(response.data));
      // setPlanos(response.data);
    }

    loadAllPlanos();
  }, []);

  function handleNovoPlano() {
    dispatch(cleanCurrentPlano());
    history.push('/plano/novo');
  }
  function formatDate(date) {
    return format(parseISO(date), "d 'de' MMMM', às' HH'h' ", { locale: pt });
  }

  function handleEditPlano(plano) {
    dispatch(loadCurrentPlano(plano));
    history.push('/plano/editar');
  }

  function handleRemovePlano(plano) {
    dispatch(removePlanoRequest(plano));
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando planos</strong>
        <button type="button" onClick={handleNovoPlano}>
          <MdAdd id="btNovo" size={20} color="#fff" />
          CADASTRAR
        </button>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th style={{ textAlign: 'center' }}>VALOR p/ MÊS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {planos.map(plano => (
              <tr key={plano.id}>
                <td>{plano.title}</td>
                <td>{plano.duration}</td>
                <td style={{ textAlign: 'center' }}>{plano.price}</td>
                <td style={{ textAlign: 'right' }}>
                  <Link
                    onClick={() => handleEditPlano(plano)}
                    style={{ color: '#4D85EE' }}
                  >
                    editar
                  </Link>
                  <Link
                    onClick={() => handleRemovePlano(plano)}
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
