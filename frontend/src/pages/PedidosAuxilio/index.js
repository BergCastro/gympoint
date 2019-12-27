import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';
import { loadPedidos, loadCurrentPedido } from '~/store/modules/pedido/actions';

import Modal from './Respostas';

export default function Pedidos() {
  const pedidos = useSelector(state => state.pedido.pedidos);
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    async function loadAllPedidos() {
      const response = await api.get('help-orders');
      dispatch(loadPedidos(response.data));
      // setPedidos(response.data);
    }

    loadAllPedidos();
  }, []);

  function handlePedido(pedido) {
    dispatch(loadCurrentPedido(pedido));
    setIsOpen(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
        <button onClick={openModal}> Teste Modal</button>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map(pedido => (
                <tr key={pedido.id}>
                  <td>{pedido.student.name}</td>

                  <td style={{ textAlign: 'right' }}>
                    <Link
                      onClick={() => handlePedido(pedido)}
                      style={{ color: '#4D85EE' }}
                    >
                      responder
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  Nenhuma pergunta a ser respondida! : )
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        open={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
      />
    </Container>
  );
}
