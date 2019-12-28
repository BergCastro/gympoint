import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';
import { Container, ButtonAction } from './styles';
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
  }, [dispatch]);

  function handlePedido(pedido) {
    dispatch(loadCurrentPedido(pedido));
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
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
                    <ButtonAction
                      onClick={() => handlePedido(pedido)}
                      style={{ color: '#4D85EE' }}
                    >
                      responder
                    </ButtonAction>
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
