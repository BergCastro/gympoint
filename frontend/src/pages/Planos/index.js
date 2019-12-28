import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import api from '~/services/api';
import { Container, ButtonAction } from './styles';
import {
  loadPlanos,
  loadCurrentPlano,
  cleanCurrentPlano,
  removePlanoRequest,
} from '~/store/modules/plano/actions';

export default function Planos() {
  const planos = useSelector(state => state.plano.planos);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllPlanos() {
      const response = await api.get('packages');
      dispatch(loadPlanos(response.data));
    }
    loadAllPlanos();
  }, [dispatch]);

  function handleNovoPlano() {
    dispatch(cleanCurrentPlano());
    history.push('/plano/novo');
  }

  function handleEditPlano(plano) {
    dispatch(loadCurrentPlano(plano));
    history.push('/plano/editar');
  }

  function handleRemovePlano(plano) {
    const confirmed = window.confirm('Está certo que quer remover o plano?');
    if (confirmed) dispatch(removePlanoRequest(plano));
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
              <th />
            </tr>
          </thead>
          <tbody>
            {planos.length > 0 ? (
              planos.map(plano => (
                <tr key={plano.id}>
                  <td>{plano.title}</td>
                  <td>
                    {plano.duration} {plano.duration > 1 ? 'meses' : 'mês'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <CurrencyFormat
                      value={plano.price}
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      fixedDecimalScale
                      prefix="R$ "
                    />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <ButtonAction
                      onClick={() => handleEditPlano(plano)}
                      style={{ color: '#4D85EE' }}
                    >
                      editar
                    </ButtonAction>
                    <ButtonAction
                      onClick={() => handleRemovePlano(plano)}
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
