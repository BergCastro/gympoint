import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { MdClear } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { Container, ButtonClose, ButtonAnswer, Header, Body } from './styles';
import { updatePedidoRequest } from '~/store/modules/pedido/actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function Answer({ open, afterOpenModal, closeModal }) {
  const currentPedido = useSelector(state => state.pedido.currentPedido);
  const dispatch = useDispatch();

  function handleSubmit(pedido) {
    dispatch(
      updatePedidoRequest({
        id: currentPedido.id,
        answer: pedido.answer,
      })
    );
    closeModal();
  }

  return (
    <div>
      <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Resposta"
      >
        <Container>
          <Header>
            <ButtonClose onClick={closeModal}>
              <MdClear size={20} color="#333" />
            </ButtonClose>
          </Header>
          <Body>
            <Form
              onSubmit={handleSubmit}
              initialData={currentPedido}
              autoComplete="off"
            >
              <Input
                id="question"
                multiline
                rows="6"
                name="question"
                label="PERGUNTA DO ALUNO"
              />
              <Input
                multiline
                rows="6"
                id="answer"
                name="answer"
                label="SUA RESPOSTA"
              />

              <ButtonAnswer type="submit">Responder aluno</ButtonAnswer>
            </Form>
          </Body>
        </Container>
      </Modal>
    </div>
  );
}
Answer.propTypes = {
  open: PropTypes.bool.isRequired,
  afterOpenModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
