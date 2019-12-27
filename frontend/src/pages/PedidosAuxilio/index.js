import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link, useHistory } from 'react-router-dom';
import api from '~/services/api';

import { Container } from './styles';
import {
  loadPedidos,
  loadCurrentPedido,
  removePedidoRequest,
} from '~/store/modules/pedido/actions';

export default function Pedidos() {
  // const [pedidos, setPedidos] = useState([]);
  const pedidos = useSelector(state => state.pedido.pedidos);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function loadAllPedidos() {
      const response = await api.get('help-orders');
      dispatch(loadPedidos(response.data));
      // setPedidos(response.data);
    }

    loadAllPedidos();
  }, [dispatch]);

  function handleEditPedido(pedido) {
    dispatch(loadCurrentPedido(pedido));
    history.push('/pedido/editar');
  }

  function handleRemovePedido(pedido) {
    dispatch(removePedidoRequest(pedido));
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
            {pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.student.name}</td>

                <td style={{ textAlign: 'right' }}>
                  <Link
                    onClick={() => handleEditPedido(pedido)}
                    style={{ color: '#4D85EE' }}
                  >
                    responder
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
